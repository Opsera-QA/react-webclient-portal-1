import baseActions from "utils/actionsBase";

const customSettingMigrationTaskWizardActions = {};

customSettingMigrationTaskWizardActions.createNewRecordV2 = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  isProfiles
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/create-record`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    isProfiles: isProfiles,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};
export default customSettingMigrationTaskWizardActions;