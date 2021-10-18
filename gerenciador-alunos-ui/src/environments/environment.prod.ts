export const environment = {
  production: true,

  allowedDomains: [
    new RegExp('localhost:3000')
  ],
  disallowedRoutes: [new RegExp('/oauth/token')],

  URL_API: 'http://localhost:3000'
};
