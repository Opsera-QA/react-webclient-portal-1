import baseActions from "utils/actionsBase";

const terraformCloudWorkspacesActions = {};

terraformCloudWorkspacesActions.createTerraformCloudWorkspace = async (getAccessToken, cancelTokenSource, toolId, organizationName, dataObject) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces/${organizationName}`;
  const postBody = dataObject.getPersistData();
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

terraformCloudWorkspacesActions.deleteTerraformCloudWorkspace = async (getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces/${organizationName}/${workspaceName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformCloudWorkspacesActions.getTerraformCloudWorkspaces = async (getAccessToken, cancelTokenSource, toolId, organizationName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces/${organizationName}`;  
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformCloudWorkspacesActions.getTerraformCloudWorkspaceConfiguration = async (getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspace-config/${organizationName}/${workspaceName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformCloudWorkspacesActions.getVcsProviders = async (getAccessToken, cancelTokenSource, toolId, organizationName) => {  
  const apiUrl = `/tools/${toolId}/terraform-provider-service/${organizationName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformCloudWorkspacesActions.getVcsProviderRepositories = async (getAccessToken, cancelTokenSource, toolId, authToken) => {
  const apiUrl = `/tools/${toolId}/terraform-provider-repos/${authToken}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default terraformCloudWorkspacesActions;
