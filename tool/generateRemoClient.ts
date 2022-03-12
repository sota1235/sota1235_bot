import path from 'path';
import { generateApi } from 'swagger-typescript-api';

const CLIENT_PATH = path.join(__dirname, '..', 'src', 'remo');

const main = async () => {
  await generateApi({
    name: 'client.ts',
    url: 'https://swagger.nature.global/swagger.yml',
    output: CLIENT_PATH,
  });
};

main().then(() => console.log('success')).catch((err) => console.error(err));
