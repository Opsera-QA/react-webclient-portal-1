import baseActions from "utils/actionsBase";

const customSettingMigrationTaskWizardActions = {};

customSettingMigrationTaskWizardActions.createNewRecordV2 = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/create-record`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.triggerCustomSettingsPull = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  sfdcToolId,
  storageRecordId
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/trigger-list-custom-settings`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    sfdcToolId: sfdcToolId,
    pipelineStorageRecordId: storageRecordId,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.pullCustomSettingsList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/pull-custom-settings-list`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

customSettingMigrationTaskWizardActions.triggerFieldPropertiesPull = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  wizardModel,
  selectedObjectName,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/trigger-list-field-properties`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    sfdcToolId: wizardModel?.getData("sourceToolId"),
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
    objectName: selectedObjectName
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};
export default customSettingMigrationTaskWizardActions;