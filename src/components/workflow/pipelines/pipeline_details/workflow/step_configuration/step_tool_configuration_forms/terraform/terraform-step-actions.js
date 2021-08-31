import pipelineActions from "components/workflow/pipeline-actions";
import baseActions from "utils/actionsBase";

const terraformStepActions = {};

terraformStepActions.fetchSCMDetails = async (dataObject, fieldName, getAccessToken) => {
      let toolType = dataObject?.getData(fieldName);
      let toolsList = await pipelineActions?.getToolsList(toolType, getAccessToken);
      let filteredToolsList = toolsList?.filter((tool) => tool?.configuration !== undefined); 
      return filteredToolsList;
  };

  terraformStepActions.fetchAWSDetails = async (getAccessToken) => {
    let credsList = await pipelineActions?.getToolsList("aws_account", getAccessToken);
    let filteredCredsList = credsList?.filter((cred) => cred?.configuration !== undefined);
    return filteredCredsList;
  };

  terraformStepActions.getIAMRoles = async (getAccessToken, cancelTokenSource, dataObject) => {
    let urlParams = {
      toolId: dataObject?.getData("awsToolConfigId")
    };
    const apiUrl = `/tools/aws/v2/IAMRoles`;
    return await baseActions.apiPostCallV2(getAccessToken,cancelTokenSource, apiUrl, urlParams);
  };

export default terraformStepActions;