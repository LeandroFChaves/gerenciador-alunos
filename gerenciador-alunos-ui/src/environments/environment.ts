export const environment = {
  production: false,

  allowedDomains: [
    new RegExp('localhost:3000')
  ],
  disallowedRoutes: [new RegExp('/oauth/token')],

  URL_API: 'http://localhost:3000'
};
