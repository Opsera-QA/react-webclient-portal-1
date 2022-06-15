import baseActions from "utils/actionsBase";

export const sapCpqRunParametersActions = {};

sapCpqRunParametersActions.findExistingRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/sap-cpq/run-parameters/record`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sapCpqRunParametersActions.getNewRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/sap-cpq/run-parameters/record/create`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sapCpqRunParametersActions.updateRunParametersRecordV2 = async (getAccessToken, cancelTokenSource, runParametersModel) => {
  const stepId = runParametersModel?.getData("stepId");
  const recordId = runParametersModel?.getData("recordId");
  const selectedConfigurationIndex = runParametersModel?.getData("selectedConfigurationIndex");
  const configurations = runParametersModel?.getData("configurations");
  const apiUrl = `/pipelines/sap-cpq/run-parameters/record/${recordId}/update/configurations`;

  const postBody = {
    stepId: stepId,
    selectedConfigurationIndex: selectedConfigurationIndex,
    configurations: configurations,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sapCpqRunParametersActions.triggerMigrationObjectPullV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/sap-cpq/run-parameters/record/${id}/trigger-migration-object-pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sapCpqRunParametersActions.getMigrationObjectsV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/sap-cpq/run-parameters/record/${id}/migration-objects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sapCpqRunParametersActions.setSelectedMigrationObjectsV2 = async (getAccessToken, cancelTokenSource, runParametersModel) => {
  const apiUrl = `/pipelines/sap-cpq/run-parameters/record/${runParametersModel?.getData("recordId")}/update/selected-migration-objects`;
  const postBody = {
    selectedMigrationObjects: runParametersModel?.getArrayData("selectedFiles")
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sapCpqRunParametersActions.getScriptCategories = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/sap-cpq/getScriptCategories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};