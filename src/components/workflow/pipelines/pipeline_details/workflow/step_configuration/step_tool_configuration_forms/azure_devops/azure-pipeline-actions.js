import baseActions from "utils/actionsBase";
import pipelineActions from "components/workflow/pipeline-actions";

const azurePipelineActions = {};

azurePipelineActions.getAzurePipelines = async (getAccessToken, cancelTokenSource, model, secureKey, userId) => {
  const postBody = {
    stepConfiguration: {
      "organizationName": model?.getData("organizationName"),
      "azurePipelineId": model?.getData("azurePipelineId"),
      "projectName": model?.getData("projectName")
    },
    secureKey: secureKey,
    userId: userId
  };

  const apiURL = `azure/get-pipelines`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

pipelineActions.getAzurePersonalAccessToken = async (getAccessToken, cancelTokenSource, vaultId) => {
  const apiUrl = `/vault/${vaultId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default azurePipelineActions;