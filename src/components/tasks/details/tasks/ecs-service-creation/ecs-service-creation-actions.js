import baseActions from "../../../../../utils/actionsBase";
import ECSCreationActions from "../ecs-cluster-creation/ecs-creation-actions";

const ECSServiceCreationActions = {};

ECSServiceCreationActions.getVPCs = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    region: dataObject?.getData("region"),
  };
  const apiUrl = `/tools/aws/v2/vpc`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSServiceCreationActions.getClusters = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    type: dataObject?.getData("ecsServiceRequiresCompatibilities"),
  };
  const apiUrl = `/tools/aws/v2/clusters`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSServiceCreationActions.getLoadBalancers = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    vpcId: dataObject?.getData("ecsServiceVpcId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/loadbalancers`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSServiceCreationActions.getIAMRoles = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSServiceCreationActions.getSubnets = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    vpcId:dataObject?.getData("ecsServiceVpcId"),
  };
  const apiUrl = `/tools/aws/v2/subnets`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

ECSServiceCreationActions.getLogGroups = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("toolConfigId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/logGroups`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default ECSServiceCreationActions;
