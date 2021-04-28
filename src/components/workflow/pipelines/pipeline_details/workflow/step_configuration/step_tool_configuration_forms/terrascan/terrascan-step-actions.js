import baseActions from "../../../../../../../../utils/actionsBase";

const TerrascanStepActions = {};

TerrascanStepActions.getRules = async (platform, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/terrascan/rules/${platform}`;
  let response = await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default TerrascanStepActions;