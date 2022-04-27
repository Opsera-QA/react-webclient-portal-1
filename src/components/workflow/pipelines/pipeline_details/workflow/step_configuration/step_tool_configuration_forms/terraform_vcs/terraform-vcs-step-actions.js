import baseActions from "utils/actionsBase";

const terraformVcsStepActions = {};

terraformVcsStepActions.getWorkspaces = async (getAccessToken, cancelTokenSource, toolId, organizationName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-workspaces-identifiers/${organizationName}/VCS`;  
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default terraformVcsStepActions;
