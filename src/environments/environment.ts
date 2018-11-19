// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiBaseUrl: 'https://api-stg.satori.works',
  // fbApiBaseUrl: 'https://api-stg.satori.works'
  apiBaseUrl: 'http://localhost:5000',
  hostBaseUrl: 'http://localhost:4200',
  outerBaseUrl: 'https://1195315a.ngrok.io'
};
