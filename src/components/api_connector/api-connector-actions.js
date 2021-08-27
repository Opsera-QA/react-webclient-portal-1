import baseActions from "utils/actionsBase";

const apiConnectorActions = {};

apiConnectorActions.updateConnectorSettingsV2 = async (getAccessToken, cancelTokenSource, tool, apiConnectorModel) => {
  const apiUrl = `/connectors/${tool}/update`;
  const postBody = {
    ...apiConnectorModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apiConnectorActions.createConnectorSettingsV2 = async (getAccessToken, cancelTokenSource, tool, apiConnectorModel) => {
  const apiUrl = `/connectors/${tool}/trigger`;
  const postBody = {
    ...apiConnectorModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default apiConnectorActions;