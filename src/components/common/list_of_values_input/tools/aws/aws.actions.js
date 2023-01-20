import baseActions from "utils/actionsBase";

export const awsActions = {};

awsActions.getLogGroups = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  region,
  ) => {
  const queryParameters = {
    region: region
  };
  const apiUrl = `/tools/${awsToolId}/aws/v2/log-groups`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParameters,
    );
};

awsActions.getAwsRegionsV2 = async (cancelTokenSource) => {
  const apiUrl = `/users/aws/regions`;
  return await baseActions.apiTokenlessGetCallV2(cancelTokenSource, apiUrl);
};

awsActions.getSecurityGroups = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  region,
) => {
  const urlParams = {
    region: region
  };
  const apiUrl = `/tools/${awsToolId}/aws/v2/security-groups`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

awsActions.getClusters = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  type,
  region,
) => {
  const queryParameters = {
    type: type,
    region: region,
  };
  const apiUrl = `/tools/${awsToolId}/aws/v2/clusters`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParameters
  );
};

awsActions.getLoadBalancers = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  vpcId,
  region,
) => {
  const apiUrl = `/tools/${awsToolId}/aws/v2/load-balancers`;
  const urlParams = {
    vpcId: vpcId,
    region: region,
  };

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

awsActions.getIamRoles = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  region,
) => {
  const apiUrl = `/tools/${awsToolId}/aws/v2/iam-roles`;
  const queryParameters = {
    region: region,
  };

  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParameters,
  );
};

awsActions.getSubnets = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  vpcId,
) => {
  const urlParams = {
    vpcId: vpcId,
  };
  const apiUrl = `/tools/${awsToolId}/aws/v2/subnets`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

awsActions.getKeyPairs = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  region,
) => {
  const queryParameters = {
    region: region,
  };
  const apiUrl = `/tools/${awsToolId}/aws/v2/key-pairs`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParameters,
  );
};

awsActions.getVpcs = async (
  getAccessToken,
  cancelTokenSource,
  awsToolId,
  region,
) => {
  const urlParams = {
    region: region,
  };
  const apiUrl = `/tools/${awsToolId}/aws/v2/vpcs`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

awsActions.getS3BucketList = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
) => {
  const apiUrl = `/tools/${toolId}/aws/buckets`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

// TODO: Can we deprecate one of these?
awsActions.getS3BucketListWithRegions = async (
  getAccessToken,
  cancelTokenSource,
  toolId,
) => {
  const apiUrl = `/tools/${toolId}/aws/buckets`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};