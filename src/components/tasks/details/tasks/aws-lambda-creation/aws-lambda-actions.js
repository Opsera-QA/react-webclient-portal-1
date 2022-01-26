import baseActions from "../../../../../utils/actionsBase";

const AWSLambdaFunctionActions = {};

AWSLambdaFunctionActions.getIAMRoles = async (getAccessToken, cancelTokenSource, dataObject) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolConfigId"),
    region: dataObject?.getData("region")
  };
  const apiUrl = `/tools/aws/v2/IAMRoles`;
  return await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
};

AWSLambdaFunctionActions.getLanguages = async (getAccessToken, cancelTokenSource, dataObject) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolConfigId")
  };
  const apiUrl = `/tools/aws/v2/listLanguages`;
  return await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
};

AWSLambdaFunctionActions.getFunctions = async (getAccessToken, dataObject) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolConfigId")
  };
  const apiUrl = `/tools/aws/v2/listFunctions`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, urlParams);
};

export default AWSLambdaFunctionActions;
