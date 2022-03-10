import baseActions from "utils/actionsBase";

const terraformProvidersActions = {};

terraformProvidersActions.createTerraformVcsProvider = async (getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces/${organizationName}`;
  const postBody = {
    workspaceName: workspaceName
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

terraformProvidersActions.deleteTerraformVcsProvider = async (getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces/${organizationName}/${workspaceName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformProvidersActions.getTerraformVcsProviders = async (getAccessToken, cancelTokenSource, toolId, organizationName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces/${organizationName}`;  
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformProvidersActions.getTerraformCloudWorkspaceConfiguration = async (getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspace-config/${organizationName}/${workspaceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default terraformProvidersActions;
