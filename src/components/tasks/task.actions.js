import baseActions from "utils/actionsBase";
import sfdcPipelineActions from "../workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

const taskActions = {};

taskActions.getTasksListV2 = async (getAccessToken, cancelTokenSource, taskFilterModel, fields) => {
  const apiUrl = `/tasks`;
  const urlParams = {
    params: {
      sort: taskFilterModel?.getFilterValue("sortOption"),
      page: taskFilterModel?.getFilterValue("currentPage"),
      size: taskFilterModel?.getFilterValue("pageSize"),
      tag: taskFilterModel?.getFilterValue("tag"),
      type: taskFilterModel?.getFilterValue("type"),
      status: taskFilterModel?.getFilterValue("status"),
      active: taskFilterModel?.getFilterValue("active"),
      tool: taskFilterModel?.getFilterValue("toolIdentifier"),
      search: taskFilterModel?.getFilterValue("search"),
      category: taskFilterModel?.getData("category"),
      owner: taskFilterModel?.getFilterValue("owner"),
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.getTaskByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/tasks/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActions.createTaskV2 = async (getAccessToken, cancelTokenSource, taskModel) => {
  const apiUrl = "/tasks/create";
  const postBody = {
    ...taskModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.updateGitTaskV2 = async (getAccessToken, cancelTokenSource, taskModel) => {
  const apiUrl = `/tasks/${taskModel.getData("_id")}/update`;
  const postBody = {
    ...taskModel.getPersistData()
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.deleteGitTaskV2 = async (getAccessToken, cancelTokenSource, dataObject) => {
  const apiUrl = `/tasks/${dataObject.getData("_id")}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActions.runTaskV3 = async (getAccessToken, cancelTokenSource, taskId, postBody) => {
  const apiUrl = `/tasks/${taskId}/run`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
    );
};

taskActions.stopTaskV3 = async (getAccessToken, cancelTokenSource, taskId) => {
  const apiUrl = `/tasks/${taskId}/stop`;
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

taskActions.getLovTasksListV2 = async (getAccessToken, cancelTokenSource, type, fields) => {
  const apiUrl = `/tasks`;
  const urlParams = {
    params: {
      sort: "name",
      type: type,
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.doesCertificateGenerationTaskExist = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tasks/certificate-generation-task-exists`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

taskActions.getGitTaskAccessForUserEmail = async (getAccessToken, cancelTokenSource, taskFilterModel, email) => {
  const sortOption = taskFilterModel?.getData("sortOption");
  const apiUrl = `/tasks/user/${email}`;
  const urlParams = {
    params: {
      sort: sortOption?.value,
      size: taskFilterModel.getData("pageSize"),
      page: taskFilterModel.getData("currentPage"),
      search: taskFilterModel.getFilterValue("search"),
      fields: ["name", "type", "owner", "roles"]
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

taskActions.processSyncRequest = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/git/processSyncRequest`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

// TODO: This should be a get route.
taskActions.createEcsClusterWithTaskIdV2 = async (getAccessToken, cancelTokenSource, taskId) => {
  const apiUrl = `/tools/aws/v2/create/ecs`;
  const postBody = {
    taskId: taskId,
  };

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.createECSServoce = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/create/ecs/service`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.checkECSStatus = async (postBody, getAccessToken) => {
  const apiUrl = `/tools/aws/v2/ecs/status`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.generateCert = async (getAccessToken, id) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/generatecert`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

taskActions.getCert = async (getAccessToken, id, cancelTokenSource) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/getcert`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.getPrivateKey = async (getAccessToken, id, cancelTokenSource) => {
  const postBody= {"taskId" : id};
  const apiUrl = `/tasks/getprivatekey`;
  return await baseActions.apiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.syncCertToJenkins = async (getAccessToken, gitTasksDataDto, cancelTokenSource) => {
  const postBody= {"taskId" : gitTasksDataDto.getData("_id"), "jenkinsId": gitTasksDataDto.getData("jenkinsIds")};
  const apiUrl = `/tasks/synchcert`;
  return await baseActions.apiPostCall(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.logClusterCancellation = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const apiUrl = `/tools/aws/v2/cancel/ecs`;
  let postBody = {
    taskId: gitTasksDataDto.getData("_id"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: This should be a get route.
taskActions.createAksClusterWithTaskIdV2 = async (getAccessToken, cancelTokenSource, taskId) => {
  const apiUrl = `/tools/azure/create/aks`;
  const postBody = {
    taskId: taskId,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.logAksClusterCancellation = async (getAccessToken, cancelTokenSource, gitTasksDataDto) => {
  const apiUrl = `/tools/azure/cancel/aks`;
  let postBody = {
    taskId: gitTasksDataDto.getData("_id"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.stopTask = async (getAccessToken, cancelTokenSource, taskModel) => {
  const postBody = {
    ...taskModel.getPersistData()
  };
  const apiUrl = `/tools/git/${taskModel.getData("_id")}/stop`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO : wire up api to validate the deployment id used for quick deploy task
taskActions.validateDeployId = async (getAccessToken, cancelTokenSource, taskModel) => {
  const postBody = {
    ...taskModel.getPersistData()
  };
  const apiUrl = `/tasks/validateDeployKey`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO : Generic task trigger function
taskActions.triggerTask = async (getAccessToken, cancelTokenSource, taskData) => {
  const postBody = {
    taskId: taskData.getData("_id"),
    ...taskData.getData("configuration")
  };

  const apiUrl = `/tasks/${taskData.getData("_id")}/run`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

taskActions.getTaskAuditLogsByTaskId = async (
  getAccessToken,
  cancelTokenSource,
  taskId,
) => {
  const apiUrl = `/audit-logs/task/${taskId}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

export default taskActions;