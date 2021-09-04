import { DeployJsonSchema } from './tool/generateDeployJson';
import fs from 'fs';
import path from 'path';

export const deployInfoJsonPath = path.join(__dirname, 'assets', 'deploy.json');
export const getDeployInfo = (): DeployJsonSchema | undefined => {
  if (!fs.existsSync(deployInfoJsonPath)) {
    return undefined;
  }

  const deployInfoJson = fs.readFileSync(deployInfoJsonPath, 'r');

  try {
    return JSON.parse(deployInfoJson) as DeployJsonSchema;
  } catch (e) {
    // should log
    return undefined;
  }
};
