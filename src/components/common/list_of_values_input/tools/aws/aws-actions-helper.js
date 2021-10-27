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

AWSActionsHelper.getStackList = async (awsToolId, getAccessToken, cancelTokenSource) => {
  const apiUrl = "/tools/aws/ebs/solutionStack";
  const postBody = {
    awsToolId: awsToolId
  };
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default AWSActionsHelper;
