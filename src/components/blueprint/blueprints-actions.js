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

// TODO: Call this with the above method after it's verified
blueprintsActions.getBlueprintSearchResultsManual = async (getAccessToken, cancelTokenSource, pipelineId, runNumber) => {
  const apiUrl = `/analytics/blueprint/pipeline/${pipelineId}`;

  const urlParams = {
    params: {
      run: runNumber
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

export default blueprintsActions;