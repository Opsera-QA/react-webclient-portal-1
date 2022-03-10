import baseActions from "utils/actionsBase";

export const toolCategoryActions = {};

toolCategoryActions.getToolTypesV2 = async (getAccessToken, cancelTokenSource, includeInactive) => {
  const apiUrl = `/registry/types`;
  const queryParams = {
    params: {
      hidden: includeInactive,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

toolCategoryActions.getToolTypeByIdV2 = async (getAccessToken, cancelTokenSource, toolTypeId) => {
  const apiUrl = `/registry/type/${toolTypeId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolCategoryActions.createToolTypeV2 = async (getAccessToken, cancelTokenSource, toolTypeModel) => {
  const apiUrl = "/registry/type/create";
  const postBody = {
    ...toolTypeModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolCategoryActions.updateToolTypeV2 = async (getAccessToken, cancelTokenSource, toolTypeModel) => {
  const apiUrl = `/registry/type/${toolTypeModel?.getData("_id")}/update`;
  const postBody = {
    ...toolTypeModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolCategoryActions.deleteToolTypeV2 = async (getAccessToken, cancelTokenSource, toolTypeId) => {
  const apiUrl = `/registry/type/${toolTypeId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};