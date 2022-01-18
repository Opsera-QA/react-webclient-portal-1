import baseActions from "../../../../../../../../utils/actionsBase";

const SentinelStepActions = {};

SentinelStepActions.getTags = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/sentinel/tags`;
  let response = await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default SentinelStepActions;