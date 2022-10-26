import baseActions from "utils/actionsBase";

export const awsActions = {};

awsActions.getLogGroups = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  awsRegion,
  ) => {
  const postBody = {
    toolId: awsToolId,
    region: awsRegion
  };
  const apiUrl = `/tools/aws/v2/logGroups`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
    );
};
