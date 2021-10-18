
import baseActions from "utils/actionsBase";

const deleteToolsActions = {};

deleteToolsActions.deleteToolV2 = async (getAccessToken, dataObject, cancelTokenSource) => {
    const apiUrl = `/tools/${dataObject.getData("_id")}`;
    return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

deleteToolsActions.getRegistryUsedByTool = async (getAccessToken, toolId, cancelTokenSource) => {
  const apiUrl = `/tools/${toolId}/registry`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default deleteToolsActions;