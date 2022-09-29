import baseActions from "utils/actionsBase";

const fortifyToolActions = {};

fortifyToolActions.getScanTools = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/scanTools";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

fortifyToolActions.getPortals = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/fortify/portals";
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default fortifyToolActions;
