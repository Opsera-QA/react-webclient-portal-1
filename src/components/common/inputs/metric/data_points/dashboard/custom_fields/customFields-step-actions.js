import baseActions from "utils/actionsBase";

const customFieldsStepActions = {};

customFieldsStepActions.getJiraCustomFields = async (getAccessToken, cancelTokenSource, fieldType) => {
  const apiUrl = "/mappings/project/jira/getCustomFields";
  const queryParameters = {};

  if (fieldType) { 
    queryParameters.fieldType = fieldType; 
  }
    
  return baseActions.apiGetCallV3( getAccessToken, cancelTokenSource, apiUrl, queryParameters);  
};

export default customFieldsStepActions;
