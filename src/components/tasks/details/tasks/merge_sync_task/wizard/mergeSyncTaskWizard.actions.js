import baseActions from "utils/actionsBase";
import taskActions from "components/tasks/task.actions";

const mergeSyncTaskWizardActions = {};

mergeSyncTaskWizardActions.createNewRecordV2 = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  isProfiles
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/create-record`;
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

mergeSyncTaskWizardActions.updatePipelineStorageRecordV2 = async (getAccessToken, cancelTokenSource, taskWizardModel) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskWizardModel?.getData("recordId")}`;
  const componentTypes = taskWizardModel?.getData("isProfiles") ? [...taskWizardModel?.getArrayData("selectedComponentTypes"), "Profile"] : taskWizardModel?.getArrayData(
    "selectedComponentTypes",
  );
  const postBody = {
    selectedComponentTypes: componentTypes,
    lastCommitFromTimeStamp: taskWizardModel?.getData("fromDate"),
    lastCommitToTimeStamp: taskWizardModel?.getData("toDate"),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

mergeSyncTaskWizardActions.setSelectedFileListV2 = async (getAccessToken, cancelTokenSource, pipelineStorageRecordId, fileSelectionRules) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${pipelineStorageRecordId}/selected-file-list`;
  const postBody = {
    rules: fileSelectionRules,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

mergeSyncTaskWizardActions.triggerGitToGitSourceFilePull = async (
  getAccessToken,
  cancelTokenSource,
  taskWizardModel,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskWizardModel?.getData(
    "recordId",
  )}/git-to-git/source-files`;
  const postBody = {
    taskId: taskWizardModel?.getData("taskId"),
    runCount: taskWizardModel?.getData("runCount"),
    lastCommitFromTimestamp: taskWizardModel?.getData(
      "fromDate",
    ),
    lastCommitToTimestamp: taskWizardModel?.getData("toDate"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

mergeSyncTaskWizardActions.triggerSalesforceToGitSourceFilePull = async (
  getAccessToken,
  cancelTokenSource,
  taskWizardModel,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskWizardModel?.getData(
    "recordId",
  )}/salesforce-to-git/source-files`;
  const componentTypes = taskWizardModel?.getData("isProfiles") ? [...taskWizardModel?.getArrayData("selectedComponentTypes"), "Profile"] : taskWizardModel?.getArrayData(
    "selectedComponentTypes",
  );
  const postBody = {
    componentTypes: componentTypes,
    taskId: taskWizardModel?.getData("taskId"),
    runCount: taskWizardModel?.getData("runCount"),
    lastCommitFromTimestamp: taskWizardModel?.getData(
      "fromDate",
    ),
    lastCommitToTimestamp: taskWizardModel?.getData("toDate"),
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

mergeSyncTaskWizardActions.triggerComparisonFilePull = async (
  getAccessToken,
  cancelTokenSource,
  taskWizardModel,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskWizardModel?.getData(
    "recordId",
  )}/comparison-files`;
  const queryParams = {
    params: {
      taskId: taskWizardModel?.getData("taskId"),
      runCount: taskWizardModel?.getData("runCount"),
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParams,
  );
};

mergeSyncTaskWizardActions.pullDiffFileListV2 = async (
  getAccessToken,
  cancelTokenSource,
  pipelineStorageRecordId,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${pipelineStorageRecordId}/diff-file-list`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

mergeSyncTaskWizardActions.pullSourceFileListV2 = async (
  getAccessToken,
  cancelTokenSource,
  pipelineStorageRecordId,
  fileSelectionRules,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${pipelineStorageRecordId}/source-file-list`;
  const queryParams = {
    params: {
      rules: fileSelectionRules,
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParams,
  );
};

mergeSyncTaskWizardActions.pullSourceFileRuleValuesV2 = async (
  getAccessToken,
  cancelTokenSource,
  pipelineStorageRecordId,
  fieldName,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${pipelineStorageRecordId}/source/files/values/${fieldName}`;

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

mergeSyncTaskWizardActions.retrieveSelectedFileContent = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  fileName
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskId}/file`;
  const queryParams = {
    params: {
      taskId: taskId,
      runCount: runCount,
      fileName: fileName,
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParams,
  );
};

mergeSyncTaskWizardActions.updateSelectedFileContent = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  fileName,
  fileContent,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/file/update`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    fileName: fileName,
    fileContent: fileContent,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

mergeSyncTaskWizardActions.confirmFileDiffSelections = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
  runCount,
  fileName,
  deltas,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/file/deltas/update`;
  const postBody = {
    taskId: taskId,
    runCount: runCount,
    fileName: fileName,
    deltas: deltas,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

mergeSyncTaskWizardActions.updateSelectedFileContentByOption = async (
  getAccessToken,
  cancelTokenSource,
  pipelineStorageRecordId,
  fileName,
  option,
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${pipelineStorageRecordId}/file/update`;
  const postBody = {
    option: option,
    fileName: fileName,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

mergeSyncTaskWizardActions.triggerTaskV2 = async (getAccessToken, cancelTokenSource, gitTaskId) => {
  const apiUrl = `/tasks/wizard/salesforce/bulk-migration/${gitTaskId}/trigger-task`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

mergeSyncTaskWizardActions.runMergeSyncTask = async (getAccessToken, cancelTokenSource, wizardModel) => {
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

mergeSyncTaskWizardActions.fileConvertView = async (
  getAccessToken,
  cancelTokenSource,
  taskWizardModel,
  fileContent,
  conversionTypeFrom = "xml",
  conversionTypeTo = "json"
) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/file/convert`;
  const postBody = {
    taskId: taskWizardModel?.getData("taskId"),
    fileContent: fileContent,
    conversionTypeFrom: conversionTypeFrom,
    conversionTypeTo: conversionTypeTo
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};
export default mergeSyncTaskWizardActions;