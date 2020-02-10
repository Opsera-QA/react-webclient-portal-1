function onAuthRequired({ history }) {
  history.push("/login");
}

export const okta_config = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
  pkce: true,
  onAuthRequired: onAuthRequired
};
export const apiServerUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
