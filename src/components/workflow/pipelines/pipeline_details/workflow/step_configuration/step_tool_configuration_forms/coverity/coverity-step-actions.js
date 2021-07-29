import pipelineActions from "components/workflow/pipeline-actions";
const coverityStepActions = {};

coverityStepActions.fetchSCMDetails = async (dataObject, fieldName, getAccessToken) => {
      let toolType = dataObject?.getData(fieldName);
      let toolsList = await pipelineActions?.getToolsList(toolType, getAccessToken);
      let filteredToolsList = toolsList?.filter((tool) => tool?.configuration !== undefined); 
      return filteredToolsList;
  };

export default coverityStepActions;