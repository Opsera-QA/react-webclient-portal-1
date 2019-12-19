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

// backend urls

export const BACKENDURIJava = "https://serveropsera.com:9091/api"

export const baseURL =
  "http://ec2-3-17-157-88.us-east-2.compute.amazonaws.com:3000"

export const oldURL =
  "http://ec2-18-220-143-66.us-east-2.compute.amazonaws.com:3000"

export const serverURL = `http://localhost:3000/`

// api connectors URL

export const apiConnectorURL = `http://52.15.121.104:3040/api/`