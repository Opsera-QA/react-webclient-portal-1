import baseActions from "utils/actionsBase";
import taskActions from "../../../../task.actions";

const dataSeedingTaskWizardActions = {};

dataSeedingTaskWizardActions.createNewRecordV2 = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount
) => {
  const apiUrl = `/tasks/data-seeding/wizard/create-record`;
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

dataSeedingTaskWizardActions.triggerCustomSettingsPull = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  sfdcToolId,
  storageRecordId
) => {
  const apiUrl = `/tasks/data-seeding/wizard/trigger-list-custom-settings`;
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

dataSeedingTaskWizardActions.pullCustomSettingsList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/pull-custom-settings-list`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

dataSeedingTaskWizardActions.triggerDependenyObjectListPull = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  wizardModel,
  selectedObjectName,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/trigger-dependent-object-list`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    sfdcToolId: wizardModel?.getData("sourceToolId"),
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
    objectName: selectedObjectName,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.triggerFieldPropertiesPull = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  wizardModel,
  selectedObjectName,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/trigger-list-field-properties`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    sfdcToolId: wizardModel?.getData("sourceToolId"),
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
    objectName: selectedObjectName,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.setSelectedObjectList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/selected-object-list`;
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

dataSeedingTaskWizardActions.pullDependentObjectList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/pull-dependent-object-list`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

dataSeedingTaskWizardActions.pullFieldList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/pull-field-list`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

dataSeedingTaskWizardActions.updateSelectedDependentObjects = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  members,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/selected-dependent-object-list`;
  const postBody = {
    selectedDependentObjectList: members,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.updateSelectedFields = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  finalSelectedFields,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/selected-field-list`;
  const postBody = {
    selectedFieldList: finalSelectedFields,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.setFilterQuery = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  query,
  queryFilters,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/set-query-filter`;
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

dataSeedingTaskWizardActions.validateQuery = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
  query,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/validate-query`;
  const postBody = {
    query: query,
    sfdcToolId: wizardModel?.getData("sourceToolId"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.getRecordCount = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/records-count`;
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

dataSeedingTaskWizardActions.getStorageDetails = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/org-size-limit`;
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

dataSeedingTaskWizardActions.runDataSeedingTask = async (getAccessToken, cancelTokenSource, wizardModel) => {
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

dataSeedingTaskWizardActions.downloadCustomSettingsReport = async (getAccessToken, cancelTokenSource, taskId, runCount, expiryDate) => {
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    expiryDate: expiryDate
  };

  const apiUrl = `/tasks/data-seeding/wizard/download-report`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.setCsvFieldsList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/csv-fields-list`;
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

dataSeedingTaskWizardActions.setFieldMappings = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/set-fields-mappings`;
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

dataSeedingTaskWizardActions.getManagedPackageList = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  wizardModel,
  selectedObjectName,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/get-managed-package-list`;
  const postBody = {
    taskId: taskId,
    sfdcToolId: wizardModel?.getData("sourceToolId"),
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
    objectName: selectedObjectName,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.setSelectedManagedPackageList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/${wizardModel?.getData("recordId")}/selected-managed-package-list`;
  const postBody = {
    selectedManagedPackageList: wizardModel?.getData("selectedManagedPackageList"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

dataSeedingTaskWizardActions.getFilterableFieldsList = async (
  getAccessToken,
  cancelTokenSource,
  wizardModel,
) => {
  const apiUrl = `/tasks/data-seeding/wizard/get-filterable-fields`;
  const postBody = {
    taskId: wizardModel?.getData("taskId"),
    sfdcToolId: wizardModel?.getData("sourceToolId"),
    pipelineStorageRecordId: wizardModel?.getData("recordId"),
    objectName: wizardModel?.getData("selectedCustomSetting")?.componentName,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default dataSeedingTaskWizardActions;