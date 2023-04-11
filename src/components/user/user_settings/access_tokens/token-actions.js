import baseActions from "utils/actionsBase";

const tokenActions = {};

tokenActions.createToken = async (getAccessToken, cancelTokenSource, tokenModel) => {
  const apiUrl = "/users/token/create";

  const postBody = {
    ...tokenModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

tokenActions.getTokens = async (getAccessToken, cancelTokenSource, tokenFilterModel) => {
  const apiUrl = "/users/tokens";
  const sortOption = tokenFilterModel?.getData("sortOption");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: tokenFilterModel?.getData("currentPage"),
      size: tokenFilterModel?.getData("pageSize"),
      search: tokenFilterModel?.getFilterValue("search"),
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

tokenActions.getTokenById = async (getAccessToken, cancelTokenSource, tokenId) => {
  const apiUrl = `/users/tokens/${tokenId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

tokenActions.expireToken = async (getAccessToken, cancelTokenSource, tokenId) => {
  const apiUrl = `/users/token/expire/${tokenId}`;
  return await baseActions.apiPatchCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

tokenActions.getTokenActivity = async (getAccessToken, cancelTokenSource, tokenFilterModel, tokenId = "") => {
  const apiUrl = `/users/token/activity/${tokenId}`;
  const sortOption = tokenFilterModel.getData("sortOption");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: tokenFilterModel.getData("currentPage"),
      size: tokenFilterModel.getData("pageSize"),
      search: tokenFilterModel.getFilterValue("search"),
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default tokenActions;