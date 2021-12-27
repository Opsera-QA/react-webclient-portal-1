import baseActions from "utils/actionsBase";

export const informaticaRunParametersActions = {};

informaticaRunParametersActions.findExistingRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/informatica/run-parameters/record`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

informaticaRunParametersActions.getNewRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/informatica/run-parameters/record/create`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

informaticaRunParametersActions.updateRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, runParametersModel) => {
  const stepId = runParametersModel?.getData("stepId");
  const recordId = runParametersModel?.getData("recordId");
  const selectedConfigurationIndex = runParametersModel?.getData("selectedConfigurationIndex");
  const configurations = runParametersModel?.getData("configurations");
  const apiUrl = `/pipelines/informatica/run-parameters/record/${recordId}/update/configurations`;

  const postBody = {
    stepId: stepId,
    selectedConfigurationIndex: selectedConfigurationIndex,
    configurations: configurations,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

informaticaRunParametersActions.triggerMigrationObjectPullV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/informatica/run-parameters/record/${id}/trigger-migration-object-pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

informaticaRunParametersActions.getMigrationObjectsV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/informatica/run-parameters/record/${id}/migration-objects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

informaticaRunParametersActions.setSelectedMigrationObjectsV2 = async (getAccessToken, cancelTokenSource, runParametersModel) => {
  const apiUrl = `/pipelines/informatica/run-parameters/record/${runParametersModel?.getData("recordId")}/update/selected-migration-objects`;
  const postBody = {
    selectedMigrationObjects: runParametersModel?.getArrayData("selectedMigrationObjects")
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};