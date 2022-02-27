import baseActions from "utils/actionsBase";

export const userDataMappingActions = {};

userDataMappingActions.getUserDataMappingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/mappings/user/v2`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

userDataMappingActions.getUserDataMappingByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/mappings/user/v2/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

userDataMappingActions.createUserDataMappingV2 = async (getAccessToken, cancelTokenSource, userDataMappingModel) => {
  const apiUrl = "/mappings/user/v2/create";
  const postData = {
    ...userDataMappingModel?.getPersistData(),
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

userDataMappingActions.updateUserDataMappingV2 = async (getAccessToken, cancelTokenSource, userDataMappingModel) => {
  const apiUrl = `/mappings/user/v2/${userDataMappingModel?.getData("_id")}/update`;
  const postData = {
    ...userDataMappingModel?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

userDataMappingActions.deleteUserDataMappingV2 = async (getAccessToken, cancelTokenSource, userMappingId) => {
  const apiUrl = `/mappings/user/v2/${userMappingId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
