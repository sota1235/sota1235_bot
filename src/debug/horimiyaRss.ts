import {HorimiyaRssService} from "../services/horimiyaRssService";

const service = new HorimiyaRssService();

service.getLatestArticles()
  .then((result) => {
    console.log(result);
  });