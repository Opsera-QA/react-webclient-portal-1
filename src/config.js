// This relies on the .env configuration files for Development, Staging and Production
const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;
const ISSUER = "https://dev-842100.oktapreview.com/oauth2/default" // process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export const apiServerUrl = `https://${process.env.REACT_APP_OPSERA_API_HOST}`;
console.log(process.env.REACT_APP_OPSERA_CLIENT_HOST)
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: `http://${process.env.REACT_APP_OPSERA_CLIENT_HOST}/implicit/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: `http://${process.env.REACT_APP_OPSERA_CLIENT_HOST}/api/messages`
  },
};

// backend urls: TODO: Refactor this
export const BACKENDURIJava = "https://serveropsera.com:9091/api";
export const baseURL = "http://ec2-3-17-157-88.us-east-2.compute.amazonaws.com:3000";
export const oldURL = "http://ec2-18-220-143-66.us-east-2.compute.amazonaws.com:3000";
export const apiConnectorURL = `http://52.15.121.104:3040/api/`;
