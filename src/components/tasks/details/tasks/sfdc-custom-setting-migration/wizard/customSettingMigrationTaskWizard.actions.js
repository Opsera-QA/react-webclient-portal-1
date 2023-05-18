import baseActions from "utils/actionsBase";
import taskActions from "../../../../task.actions";
import { MIGRATION_TYPES } from "../inputs/SalesforceCustomSettingTaskTypeSelectInput";

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

customSettingMigrationTaskWizardActions.setSelectedObjectList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/selected-object-list`;
  const postBody = {
    selectedObject: [wizardModel?.getData("selectedCustomSetting")],
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.pullFieldList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/pull-field-list`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

customSettingMigrationTaskWizardActions.updateSelectedFields = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  members,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/selected-field-list`;
  const postBody = {
    selectedFieldList: members,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.setFilterQuery = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  query,
  queryFilters,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/set-query-filter`;
  const postBody = {
    query: query,
    queryFilters: queryFilters,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.validateQuery = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  query,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/validate-query`;
  const postBody = {
    query: query,
    sfdcToolId:
      wizardModel?.getData("taskType") ===
      MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG
        ? wizardModel?.getData("targetToolId")
        : wizardModel?.getData("sourceToolId"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.getRecordCount = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/records-count`;
  const postBody = {
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
    taskId: wizardModel?.getData("taskId"),
    sfdcToolId: wizardModel?.getData("sourceToolId"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.getStorageDetails = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/org-size-limit`;
  const postBody = {
    taskId: wizardModel?.getData("taskId"),
    sfdcToolId: wizardModel?.getData("targetToolId"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.runCustomSettingMigrationTask = async (getAccessToken, cancelTokenSource, wizardModel) => {
  const postBody = {
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
  };

  return await taskActions.runTaskV3(
    getAccessToken,
    cancelTokenSource,
    wizardModel?.getData("taskId"),
    postBody,
  );
};

customSettingMigrationTaskWizardActions.downloadCustomSettingsReport = async (getAccessToken, cancelTokenSource, taskId, runCount, expiryDate) => {
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    expiryDate: expiryDate
  };

  const apiUrl = `/tasks/custom-setting-migration-task/wizard/download-report`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.setCsvFieldsList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/csv-fields-list`;
  const postBody = {
    selectedObject: wizardModel?.getData("csvFields"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

customSettingMigrationTaskWizardActions.setFieldMappings = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/custom-setting-migration-task/wizard/${wizardModel?.getData("recordId")}/set-fields-mappings`;
  const postBody = {
    fieldMapping: wizardModel?.getData("fieldMapping"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};
export default customSettingMigrationTaskWizardActions;