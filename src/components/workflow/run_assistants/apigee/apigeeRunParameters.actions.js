import baseActions from "utils/actionsBase";

export const apigeeRunParametersActions = {};

apigeeRunParametersActions.findExistingRunParametersRecord = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/apigee/run-parameters/record`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

apigeeRunParametersActions.getNewRunParametersRecord = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/apigee/run-parameters/record/create`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

apigeeRunParametersActions.updateRunParametersRecord = async (getAccessToken, cancelTokenSource, runParametersModel) => {
  const stepId = runParametersModel?.getData("stepId");
  const recordId = runParametersModel?.getData("recordId");
  const selectedConfigurationIndex = runParametersModel?.getData("selectedConfigurationIndex");
  const configurations = runParametersModel?.getData("configurations");
  const apiUrl = `/pipelines/apigee/run-parameters/record/${recordId}/update/configurations`;
  const postBody = {
    stepId: stepId,
    selectedConfigurationIndex: selectedConfigurationIndex,
    configurations: configurations,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeRunParametersActions.triggerMigrationObjectPull = async (getAccessToken, cancelTokenSource, toolId, id) => {
  const apiUrl = `/pipelines/apigee/run-parameters/record/${id}/trigger-migration-object-pull`;
  const postBody = {
    toolId: toolId
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeRunParametersActions.getMigrationObjects = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/apigee/run-parameters/record/${id}/migration-objects`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

apigeeRunParametersActions.setSelectedMigrationObjects = async (getAccessToken, cancelTokenSource, runParametersModel) => {
  const apiUrl = `/pipelines/apigee/run-parameters/record/${runParametersModel?.getData("recordId")}/update/selected-migration-objects`;
  const postBody = {
    selectedMigrationObjects: runParametersModel?.getArrayData("selectedMigrationObjects")
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeRunParametersActions.getApigeeEnvironments = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/apigee/getEnvironments`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

apigeeRunParametersActions.getMigrationObjectDependencies = async (getAccessToken, cancelTokenSource, toolId, dataObject) => {
  const apiUrl = `/pipelines/apigee/run-parameters/migration-objects/dependencies`;
  const postBody = {
    toolId: toolId,
    name: dataObject.name,
    type: dataObject.type
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};
