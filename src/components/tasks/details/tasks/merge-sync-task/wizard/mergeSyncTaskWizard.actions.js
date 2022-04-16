import baseActions from "utils/actionsBase";

const mergeSyncTaskWizardActions = {};

mergeSyncTaskWizardActions.createNewRecordV2 = async (getAccessToken, cancelTokenSource, taskWizardModel) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/create-record`;
  const postBody = {
    taskId: taskWizardModel?.getData("taskId"),
    runCount: taskWizardModel?.getData("runCount"),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

mergeSyncTaskWizardActions.updatePipelineStorageRecordV2 = async (getAccessToken, cancelTokenSource, taskWizardModel) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskWizardModel?.getData("recordId")}`;
  const postBody = {
    selectedComponentTypes: taskWizardModel?.getArrayData("selectedComponentTypes"),
    lastCommitFromTimeStamp: taskWizardModel?.getData("lastCommitFromTimeStamp"),
    lastCommitToTimeStamp: taskWizardModel?.getData("lastCommitToTimeStamp"),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

mergeSyncTaskWizardActions.setSelectedFileListV2 = async (getAccessToken, cancelTokenSource, taskWizardModel) => {
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskWizardModel?.getData("recordId")}/selected-file-list`;
  const postBody = {
    selectedFileList: taskWizardModel?.getArrayData("selectedComponentTypes"),
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
    selectedComponentTypes: taskWizardModel?.getArrayData(
      "selectedComponentTypes",
    ),
    pipelineStorageRecordId: taskWizardModel?.getData("recordId"),
    taskId: taskWizardModel?.getData("taskId"),
    runCount: taskWizardModel?.getData("runCount"),
    lastCommitFromTimeStamp: taskWizardModel?.getData(
      "lastCommitFromTimeStamp",
    ),
    lastCommitToTimeStamp: taskWizardModel?.getData("lastCommitToTimeStamp"),
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
  const postBody = {
    pipelineStorageRecordId: taskWizardModel?.getData("recordId"),
    taskId: taskWizardModel?.getData("taskId"),
    runCount: taskWizardModel?.getData("runCount"),
    lastCommitFromTimeStamp: taskWizardModel?.getData(
      "lastCommitFromTimeStamp",
    ),
    lastCommitToTimeStamp: taskWizardModel?.getData("lastCommitToTimeStamp"),
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
      pipelineStorageRecordId: taskWizardModel?.getData("recordId"),
      taskId: taskWizardModel?.getData("taskId"),
      runCount: taskWizardModel?.getData("runCount"),
      lastCommitFromTimeStamp: taskWizardModel?.getData(
        "lastCommitFromTimeStamp",
      ),
      lastCommitToTimeStamp: taskWizardModel?.getData("lastCommitToTimeStamp"),
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    queryParams,
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
  const apiUrl = `/tasks/merge-sync-task/wizard/${taskId}/file/update`;
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

mergeSyncTaskWizardActions.triggerTaskV2 = async (getAccessToken, cancelTokenSource, gitTaskId) => {
  const apiUrl = `/tasks/wizard/salesforce/bulk-migration/${gitTaskId}/trigger-task`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default mergeSyncTaskWizardActions;