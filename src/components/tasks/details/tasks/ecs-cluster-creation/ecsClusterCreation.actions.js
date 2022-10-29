import baseActions from "../../../../../utils/actionsBase";

const EcsClusterCreationActions = {};

EcsClusterCreationActions.getEc2ImageTypes = async (getAccessToken, cancelTokenSource, imageType) => {
  const apiUrl = `/tools/aws/v2/ec2/image-types/${imageType}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

EcsClusterCreationActions.getEcsOptimizedEC2 = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId"),
    imageType: dataObject?.getData("imageType")
  };
  const apiUrl = `/tools/aws/v2/ecsOptimizedEC2`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default EcsClusterCreationActions;
