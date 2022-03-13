import baseActions from "utils/actionsBase";

const externalApiIntegratorEndpointsActions = {};

externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

externalApiIntegratorEndpointsActions.createExternalApiIntegratorEndpointV2 = async (getAccessToken, cancelTokenSource, toolId, endpointModel) => {
  const apiUrl = `/tool/external-api-integrator/${toolId}/endpoints/create`;
  const postBody = {
    ...endpointModel?.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default externalApiIntegratorEndpointsActions;
