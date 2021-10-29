import baseActions from "utils/actionsBase";

const AWSActionsHelper = {};

AWSActionsHelper.searchECRRepositories = async (awsToolId, getAccessToken, cancelTokenSource) => {
    const apiUrl = "/tools/aws/repositories";
    const postBody = {
      toolId: awsToolId
    };
    return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

AWSActionsHelper.getBucketList = async (awsToolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = "/tools/aws/buckets";
  const postBody = {
    toolId: awsToolId
  };
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);

};

AWSActionsHelper.getKeyPairs = async (awsToolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = "/tools/aws/keypairs";
  const postBody = {
    toolId: awsToolId
  };
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

AWSActionsHelper.getSolutionStackList = async (getAccessToken, cancelTokenSource, awsToolId) => {
  const apiUrl = `/tools/${awsToolId}/aws/ebs/solution-stack`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default AWSActionsHelper;
