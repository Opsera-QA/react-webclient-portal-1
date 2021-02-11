import baseActions from "utils/actionsBase";

const tokenActions = {};

tokenActions.createToken = async (getAccessToken, cancelTokenSource, tokenModel) => {
  const apiUrl = "/users/token/create";

  const postBody = {
    ...tokenModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody)
};

tokenActions.getTokens = async (getAccessToken, cancelTokenSource, tokenFilterModel) => {
  const apiUrl = "/users/tokens";
  // let sortOption = tokenFilterModel.getData("sortOption");

  // let urlParams = {
  //   params: {
  //     sort: sortOption ? sortOption.value : undefined,
  //     page: tokenFilterModel.getData("currentPage"),
  //     size: tokenFilterModel.getData("pageSize"),
  //     search: tokenFilterModel.getFilterValue("search"),
  //     owner: tokenFilterModel.getFilterValue("owner")
  //   }
  // }

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, {})
};

tokenActions.getTokenById = async (getAccessToken, cancelTokenSource, tokenId) => {
  const apiUrl = `/users/tokens/${tokenId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl)
};

tokenActions.expireToken = async (getAccessToken, cancelTokenSource, tokenId) => {
  const apiUrl = `/users/token/expire/${tokenId}`;
  return await baseActions.apiPatchCallV2(getAccessToken, cancelTokenSource, apiUrl)
};

tokenActions.getTokenActivity = async (getAccessToken, cancelTokenSource, tokenId) => {
  const apiUrl = `/users/token/activity/${tokenId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl)
};

tokenActions.testTokenLogging = async (getAccessToken, cancelTokenSource, tokenModel) => {
  const apiUrl = `/api/v1/demo_me`;

  const postBody = {
    ...tokenModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody)
};

export default tokenActions;