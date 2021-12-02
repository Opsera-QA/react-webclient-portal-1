function onAuthRequired({ history }) {
  history.push("/login");
}

export const okta_config = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
  pkce: true,
  disableHttpsCheck: false,
  onAuthRequired: onAuthRequired
};

export const apiServerUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
export const NODE_ANALYTICS_API_SERVER_URL = process.env.REACT_APP_ANALYTICS_API_SERVER_URL;
