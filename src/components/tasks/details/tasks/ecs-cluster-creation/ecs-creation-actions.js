import baseActions from "../../../../../utils/actionsBase";

const ECSCreationActions = {};

ECSCreationActions.getKeyPairs = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
      toolId: dataObject?.getData("awsToolId"),
      region: dataObject?.getData("region")

  };
  const apiUrl = `/tools/aws/v2/keypairs`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getVPCs = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/vpc`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getSubnets = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId"),
    vpcId:dataObject?.getData("vpcId"),
  };
  const apiUrl = `/tools/aws/v2/subnets`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getIAMRoles = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getSecurityGroups = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/securityGroups`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getClusters = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId")
  };
  const apiUrl = `/tools/aws/v2/clusters`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getEc2ImageTypes = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId")
  };
  const apiUrl = `/tools/aws/v2/ec2ImageTypes`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSCreationActions.getEcsOptimizedEC2 = async (dataObject, getAccessToken, cancelTokenSource) => {
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

export default ECSCreationActions;
