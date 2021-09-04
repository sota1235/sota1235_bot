import fs from 'fs';
import { deployInfoJsonPath } from '../config';

export interface DeployJsonSchema {
  SOURCE_VERSION: string;
}

function generateSchema(): DeployJsonSchema {
  return {
    SOURCE_VERSION: process.env.SOURCE_VERSION || 'revision_not_found',
  };
}

function main() {
  const json = JSON.stringify(generateSchema());
  fs.writeFileSync(deployInfoJsonPath, json, {
    flag: 'w',
  });
  console.log('generating deploy info json done');
}

main();
