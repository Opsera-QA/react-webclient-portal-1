import baseActions from "utils/actionsBase";

const sfdcActions = {};

sfdcActions.getOauthDetails = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "tools/sfdc/oauthdetails";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default sfdcActions;
