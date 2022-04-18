import baseActions from "utils/actionsBase";

const customEnvironmentVariableActions = {};

customEnvironmentVariableActions.getNodeCustomEnvironmentVariables = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/configuration/variables/node";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default customEnvironmentVariableActions;
