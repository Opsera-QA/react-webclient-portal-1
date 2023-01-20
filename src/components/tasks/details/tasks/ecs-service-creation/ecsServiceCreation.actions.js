import baseActions from "../../../../../utils/actionsBase";

const ecsServiceCreationActions = {};

ecsServiceCreationActions.getIAMRoles = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    region: dataObject?.getData("regions")
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default ecsServiceCreationActions;
