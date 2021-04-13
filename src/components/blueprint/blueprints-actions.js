import baseActions from "utils/actionsBase";

const blueprintsActions = {};

blueprintsActions.getBlueprintSearchResults = async (getAccessToken, cancelTokenSource, blueprintModel) => {
  const apiUrl = `/analytics/blueprint/pipeline/${blueprintModel?.getData("pipelineId")}`;

  const urlParams = {
    params: {
      run: blueprintModel.getData("runNumber")
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default blueprintsActions;