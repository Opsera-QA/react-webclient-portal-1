import baseActions from "utils/actionsBase";

const terraformCloudOrganizationsActions = {};

terraformCloudOrganizationsActions.createTerraformCloudOrganization = async (getAccessToken, cancelTokenSource, toolId, terraformCloudOrganizationsModel) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-organizations/create`;
  const postBody = {
    ...terraformCloudOrganizationsModel.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

terraformCloudOrganizationsActions.deleteTerraformCloudOrganization = async (getAccessToken, cancelTokenSource, toolId, organizationName) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-organizations/${organizationName}/delete`;

  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

terraformCloudOrganizationsActions.getTerraformCloudOrganizations = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/terraform-cloud-organizations`;
  
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default terraformCloudOrganizationsActions;