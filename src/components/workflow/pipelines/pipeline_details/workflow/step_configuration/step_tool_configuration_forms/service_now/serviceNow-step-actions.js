import baseActions from "utils/actionsBase";

const ServiceNowStepActions = {};

ServiceNowStepActions.getChangeRequests = async (getAccessToken, cancelTokenSource, toolId, search) => {
  const apiUrl = `tools/${toolId}/serviceNow/changeRequests`;
  const queryParam = {
    search: search,
  };
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParam);
};

ServiceNowStepActions.getAssignmentGroups = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/serviceNow/assignmentGroups`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

ServiceNowStepActions.validateChangeRequest = async (getAccessToken, cancelTokenSource, toolId, changeRequestSysId) => {
  const apiUrl = `tools/${toolId}/serviceNow/changeRequest/validate`;  
  const postData = {
    changeRequestSysId: changeRequestSysId,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

export default ServiceNowStepActions;
