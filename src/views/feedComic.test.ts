import { getView } from './feedComic';

describe('feedComic', () => {
  test('no article', () => {
    expect(getView({ horimiya: [], aco: [] })).toMatchInlineSnapshot(
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
        aco: [],
      }),
    ).toMatchInlineSnapshot(`
      "「堀さんと宮村くん」
      <https://example.com|[test]>
      "
    `);
  });

  test('only aco article', () => {
    expect(
      getView({
        horimiya: [],
        aco: [
          {
            title: 'test',
            url: 'https://example.com',
          },
        ],
      }),
    ).toMatchInlineSnapshot(`
      "「あことバンビ」
      <https://example.com|[test]>"
    `);
  });

  test('both horimiya and aco articles', () => {
    expect(
      getView({
        horimiya: [
          {
            title: 'test',
            url: 'https://example.com',
          },
          {
            title: 'test2',
            url: 'https://example.com',
          },
        ],
        aco: [
          {
            title: 'test',
            url: 'https://example.com',
          },
          {
            title: 'test2',
            url: 'https://example.com',
          },
        ],
      }),
    ).toMatchInlineSnapshot(`
      "「堀さんと宮村くん」
      <https://example.com|[test]>
      <https://example.com|[test2]>
      「あことバンビ」
      <https://example.com|[test]>
      <https://example.com|[test2]>"
    `);
  });
});
