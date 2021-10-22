import baseActions from "utils/actionsBase";

const commonActions = {};

commonActions.getFeatureFlagsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/feature-flags`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};


export default commonActions;