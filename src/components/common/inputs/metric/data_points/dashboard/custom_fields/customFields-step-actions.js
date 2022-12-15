import baseActions from "utils/actionsBase";

const customFieldsStepActions = {};

customFieldsStepActions.getJiraCustomFields = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/mappings/project/jira/getCustomFields";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default customFieldsStepActions;
