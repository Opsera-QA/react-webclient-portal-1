import baseActions from "utils/actionsBase";

const externalApiIntegratorEndpointsActions = {};

externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default externalApiIntegratorEndpointsActions;
