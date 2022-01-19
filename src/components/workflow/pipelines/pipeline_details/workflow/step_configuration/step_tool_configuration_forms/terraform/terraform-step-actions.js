import baseActions from "utils/actionsBase";

const terraformStepActions = {};

// TODO: THis should be on an AWS-specific actions file
terraformStepActions.getIAMRoles = async (getAccessToken, cancelTokenSource, dataObject) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolConfigId")
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

terraformStepActions.getTerraformTags = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/terraform/tags";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default terraformStepActions;