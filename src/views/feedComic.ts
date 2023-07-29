import { ArticleEntity } from '../entities/article';

export function getView({ horimiya }: { horimiya: ArticleEntity[] }) {
  let text = '';

  if (horimiya.length === 0) {
    text = '最新のマンガはありません';
  } else {
    text += '「堀さんと宮村くん」\n';
    text += horimiya
      .map((article) => `<${article.url}|${article.title}>`)
      .join('\n');
    text += '\n';
  }

  return text;
}
