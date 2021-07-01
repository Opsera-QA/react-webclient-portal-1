import baseActions from "../../../../../utils/actionsBase";

const ECSServiceCreationActions = {};

ECSServiceCreationActions.getVPCs = async (dataObject, getAccessToken, cancelTokenSource) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolId")
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
    toolId: dataObject?.getData("awsToolId"),
    type: dataObject?.getData("requiresCompatibilities"),
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
    toolId: dataObject?.getData("awsToolId")
  };
  const apiUrl = `/tools/aws/v2/loadbalancers`;
  let response = await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default ECSServiceCreationActions;
