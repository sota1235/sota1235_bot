# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリの概要

個人用Slackボットアプリケーション。Slack Bolt（Socket Mode）で動作し、Google App Engineにデプロイされる。メッセージコマンド、リアクションイベント処理、定期スケジュールタスクを提供する。

## よく使うコマンド

```bash
# ビルド
npm run build          # TypeScriptコンパイル（出力先: lib/）
npm run watch          # ウォッチモード

# 開発実行（.envから環境変数を読み込み）
npm run start:dev

# テスト
npm test               # Jest実行
npm run test:ci        # カバレッジ付き（CI用）

# コード品質
npm run lint           # ESLint + Prettier チェック
npm run fix            # ESLint + Prettier 自動修正

# デバッグスクリプト実行
npm run debug src/debug/<script>.ts

# デプロイ用app.yaml生成
npm run generate:appYaml
```

## アーキテクチャ

### エントリポイントと起動フロー

`src/index.ts` → Slack Bolt App初期化 → ハンドラ登録 → スケジューラ起動

### ディレクトリ構成

```
src/
  messageHandlers/    # Slackメッセージコマンド（ping, echo, horimiya, help）
  reaction_handlers/  # リアクションイベントハンドラ（white_check_mark）
  services/           # ビジネスロジック（HorimiyaRssService等）
  views/              # メッセージのフォーマット・表示
  entities/           # データモデル（ArticleEntity等）
  store/              # データ永続化（抽象Store + MemoryStore実装）
  modules/            # 再利用モジュール（dkaParser: HTML解析）
  scheduler.ts        # cronジョブ（月次TODO通知、週次漫画更新通知）
  sentry.ts           # Sentryエラートラッキング初期化
```

### 主要パターン

- **ハンドラ登録パターン**: 各ハンドラはコマンド名・説明をメタデータとして返し、index.tsで一括登録
- **ストアファクトリ**: `getStoreClient()` が環境変数 `STORAGE_TYPE` に応じたストア実装を返す
- **サービス層分離**: ビジネスロジックはservices/に集約し、ハンドラから分離

### 環境変数（.env）

必須:
- `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN`, `SLACK_APP_LEVEL_TOKEN` - Slack認証
- `SENTRY_DSN` - エラートラッキング
- `STORAGE_TYPE` - ストア種別（`memory`）

### デプロイ

- **ホスティング**: Google App Engine（Node.js 20, F1インスタンス）
- **CI/CD**: GitHub Actionsでmainブランチへのpush時に自動デプロイ
- **認証**: Workload Identity Federation（OIDC）経由でGCPに認証

## コード規約

- **Node.js**: `.node-version` で管理（22.x）
- **TypeScript**: strict mode、CommonJS出力
- **Prettier**: セミコロンあり、シングルクォート、trailing comma (all)
- **pre-commit hook**: Husky + lint-stagedで`*.ts`ファイルを自動lint/fix
