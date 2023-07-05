function onAuthRequired({ history }) {
  history.push("/login");
}

export const okta_config = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
  pkce: true,
  disableHttpsCheck: false,
  onAuthRequired: onAuthRequired,
};

export const NODE_API_ORCHESTRATOR_SERVER_URL =
 "https://api.opsera-test.opsera.io";
export const NODE_ANALYTICS_API_SERVER_URL =
  process.env.REACT_APP_ANALYTICS_API_SERVER_URL;
export const NODE_DATA_MIGRATION_FILE_API_SERVER_URL =
  process.env.REACT_APP_OPSERA_API_SERVER_URL + "/data-migration-file";
// export const NODE_DATA_MIGRATION_FILE_API_SERVER_URL = "https://api.opsera-dev.opsera.io/data-migration-file";
