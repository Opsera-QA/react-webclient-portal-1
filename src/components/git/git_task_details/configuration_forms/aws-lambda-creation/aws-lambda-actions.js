import baseActions from "../../../../../utils/actionsBase";

const AWSLambdaFunctionActions = {};

AWSLambdaFunctionActions.getIAMRoles = async (getAccessToken, cancelTokenSource, dataObject) => {
  let urlParams = {
    toolId: dataObject?.getData("awsToolConfigId")
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

export default AWSLambdaFunctionActions;
