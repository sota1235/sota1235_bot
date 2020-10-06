import { ArticleEntity } from '../entities/article';

export function getView({
  horimiya,
  aco,
}: {
  horimiya: ArticleEntity[];
  aco: ArticleEntity[];
}) {
  let text = '';

  if (horimiya.length === 0 && aco.length === 0) {
    text = '最新のマンガはありません';
  } else {
    if (horimiya.length > 0) {
      text += '「堀さんと宮村くん」\n';
      text += horimiya
        .map(article => `<${article.url}|[${article.title}]>`)
        .join('\n');
      text += '\n';
    }

    if (aco.length > 0) {
      text += '「あことバンビ」\n';
      text += aco
        .map(article => `<${article.url}|[${article.title}]>`)
        .join('\n');
    }
  }

  return text;
}
