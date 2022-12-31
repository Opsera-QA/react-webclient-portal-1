import baseActions from "utils/actionsBase";

const awsActions = {};

awsActions.createS3Bucket = async (getAccessToken, cancelTokenSource, toolId, awsBucketModel) => {
    const apiUrl = `/tools/aws/bucket`;
    const postBody = {
      ...awsBucketModel,
      toolId: toolId
    };
    return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

awsActions.deleteS3Bucket = async (getAccessToken, cancelTokenSource, toolId, awsBucketModel) => {
  const apiUrl = `/tools/aws/bucket?toolId=${toolId}&region=${awsBucketModel.regions}&bucketName=${awsBucketModel.bucketName}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

awsActions.getS3BucketList = async (toolId, getAccessToken, cancelTokenSource) => {
    const urlParams = {
      params: {
        toolId: toolId,
      },
    };
  
    const apiUrl = `/tools/aws/buckets`;
    return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

awsActions.getS3BucketDetails = async (toolId, region, bucketName, getAccessToken, cancelTokenSource) => {
    const urlParams = {
      params: {
        toolId: toolId,
        region: region,
        bucketName: bucketName
      },
    };
  
    const apiUrl = `/tools/aws/bucket`;
    return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

awsActions.getS3BucketVersions = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/aws/bucket/version`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default awsActions;
