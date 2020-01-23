// This relies on the .env configuration files for Development, Staging and Production
const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID
  , ISSUER = process.env.REACT_APP_OKTA_ISSUER 
  , OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false
  , oktaRedirectUri = process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI;

export const apiServerUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
export const apiConnectorURL = process.env.REACT_APP_OPSERA_API_CONNECTORS_URL;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: oktaRedirectUri,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: `http://${process.env.REACT_APP_OPSERA_CLIENT_HOST}/api/messages`
  },
};

// backend urls: TODO: After OC-83 is complete, move into .env files (with proper DNS)
export const BACKENDURIJava = "https://serveropsera.com:9091/api";
export const baseURL = "http://ec2-3-17-157-88.us-east-2.compute.amazonaws.com:3000";
export const oldURL = "http://ec2-18-220-143-66.us-east-2.compute.amazonaws.com:3000";

