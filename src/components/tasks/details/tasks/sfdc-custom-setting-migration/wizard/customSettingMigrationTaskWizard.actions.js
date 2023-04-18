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
  storageRecordId
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/trigger-list-custom-settings`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    pipelineStorageRecordId: storageRecordId,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};
export default customSettingMigrationTaskWizardActions;