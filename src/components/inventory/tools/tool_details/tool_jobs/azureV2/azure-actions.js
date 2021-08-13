import baseActions from "utils/actionsBase";

const azureActions = {};

azureActions.createAzureCredential = async (getAccessToken, cancelTokenSource, toolId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/create`;
  const postBody = {
    ...azureApplicationModel,
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


azureActions.updateAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}/update`;
  const postBody = {
    ...azureApplicationModel
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureActions.deleteAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default azureActions;
