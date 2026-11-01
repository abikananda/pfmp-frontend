const fs = require('fs');
const packageJson = require('./package.json');

const versionFilePath = './src/environments/version.ts';
const buildTimestamp = new Date().toISOString();
const versionTemplate = `
export const AppVersion = {
  version: '${packageJson.version}',
  buildTime: '${buildTimestamp}'
};
`;

fs.writeFile(versionFilePath, versionTemplate, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(`Version ${packageJson.version} with build time ${buildTimestamp} written to version.ts`);
});
