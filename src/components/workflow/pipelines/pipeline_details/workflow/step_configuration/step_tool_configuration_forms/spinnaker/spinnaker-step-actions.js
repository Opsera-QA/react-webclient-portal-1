import baseActions from "utils/actionsBase";

const SpinnakerStepActions = {};

SpinnakerStepActions.getSpinnakerApplicationsV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/tools/${toolId}/spinnaker/applications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

SpinnakerStepActions.getSpinnakerToolsV2 = async (getAccessToken, cancelTokenSource, spinnakerToolId, applicationName) => {
  const apiUrl = "/tools/properties";
  const postBody = {
    tool: "spinnaker",
    metric: "tools",
    id: spinnakerToolId,
    appname: applicationName,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default SpinnakerStepActions;
