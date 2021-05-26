import pipelineActions from "components/workflow/pipeline-actions";
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

export default terraformStepActions;