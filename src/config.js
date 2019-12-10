// Currently set to: OpsERA-ReactWebClient on https://dev-842100.oktapreview.com/login/login.htm
//  Set as a SPA app, must have Authorization Code checked, but not Implicit

const CLIENT_ID = "0oaou6bztkPJFnxaL0h7"; // process.env.CLIENT_ID || '{clientId}';
const ISSUER = "https://dev-842100.oktapreview.com/oauth2/default" // process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;


export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};