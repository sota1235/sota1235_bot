import { getView } from './feedComic';

describe('feedComic', () => {
  test('no article', () => {
    expect(getView({ horimiya: [] })).toMatchInlineSnapshot(
      `"最新のマンガはありません"`,
    );
  });

  test('only horimiya article', () => {
    expect(
      getView({
        horimiya: [
          {
            title: 'test',
            url: 'https://example.com',
          },
        ],
      }),
    ).toMatchInlineSnapshot(`
      "「堀さんと宮村くん」
      <https://example.com|test>
      "
    `);
  });
});
