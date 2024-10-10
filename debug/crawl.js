const { DkaParser } = require('../lib/modules/dkaParser/dkaParser.js');

const parser = new DkaParser();
parser.getHorimiyaArticleList()
  .then((result) => console.log(result));
