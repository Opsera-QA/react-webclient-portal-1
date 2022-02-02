import baseActions from "utils/actionsBase";
import {axiosApiService} from "api/apiService";

// TODO: This is getting large. I think it might be wise to separate it into separate files
//  (pipeline actions being add/get/update/delete, catalog for catalog related,
//  step for step configuration related ones (save to vault, tools, etc)
const pipelineActions = {};

pipelineActions.getPipelineById = async (pipelineId, getAccessToken) => {
  const apiUrl = `/pipelines/${pipelineId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineActions.getPipelineByIdV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/v2/${pipelineId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.getWorkflowTemplatesV2 = async (getAccessToken, cancelTokenSource, catalogFilterModel, source) => {
  let sortOption = catalogFilterModel.getData("sortOption");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : null,
      size: catalogFilterModel.getData("pageSize"),
      page: catalogFilterModel.getData("currentPage"),
      search: catalogFilterModel.getFilterValue("search"),
      type: catalogFilterModel.getFilterValue("type"),
      tag: catalogFilterModel.getFilterValue("tag"),
      source: source ? source : undefined
    },
  };

  let apiUrl = `/pipelines/workflows/v2`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActions.getInUseTemplatesV2 = async (getAccessToken, cancelTokenSource) => {
  let apiUrl = `/pipelines/workflows/inuse-templates`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.getQueuedPipelineRequestV2 = async (getAccessToken, cancelTokenSource, id) => {
  let apiUrl = `/pipelines/${id}/queue`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.deleteQueuedPipelineRequestV2 = async (getAccessToken, cancelTokenSource, id) => {
  let apiUrl = `/pipelines/${id}/queue`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.getPipelinesV2 = async (getAccessToken, cancelTokenSource, pipelineFilterModel, type, fields) => {
  const urlParams = {
    params: {
      sort: pipelineFilterModel?.getFilterValue("sortOption"),
      size: pipelineFilterModel?.getFilterValue("pageSize"),
      page: pipelineFilterModel?.getData("currentPage"),
      type: type !== "all" && type !== "owner" ? type : undefined,
      myPipelines: type === "owner",
      search: pipelineFilterModel?.getFilterValue("search"),
      owner: pipelineFilterModel?.getFilterValue("owner"),
      tag: pipelineFilterModel?.getFilterValue("tag"),
      status: pipelineFilterModel?.getFilterValue("status"),
      fields: fields,
    },
  };

  let apiUrl = `/pipelines/v2`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActions.getPipelinesAccessByEmailV2 = async (getAccessToken, cancelTokenSource, pipelineFilterDto, email) => {
  const apiUrl = `/pipelines/user/${email}`;
  const sortOption = pipelineFilterDto?.getData("sortOption");
  const urlParams = {
    params: {
      sort: sortOption?.value,
      size: pipelineFilterDto?.getData("pageSize"),
      page: pipelineFilterDto?.getData("currentPage"),
      search: pipelineFilterDto?.getFilterValue("search"),
      fields: ["name", "roles", "owner"]
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

// TODO: Remove when all references are updated to V2
pipelineActions.getPipelineSummaries = async (pipelineIds, getAccessToken) => {
  let apiUrl = `/pipelines/summary`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, pipelineIds);
};

pipelineActions.getPipelineSummariesV2 = async (getAccessToken, cancelTokenSource, pipelineIds) => {
  let apiUrl = `/pipelines/summary`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, pipelineIds);
};

pipelineActions.getPipelineStates = async (pipelineIds, getAccessToken) => {
  let apiUrl = `/pipelines/state`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, pipelineIds);
};

pipelineActions.getPipelineStateAtRun = async (pipelineId, runNumber, getAccessToken) => {
  let apiUrl = `/pipelines/state/${pipelineId}/${runNumber}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Refactor
pipelineActions.getAllPipelinesV2 = async (getAccessToken, cancelTokenSource) => {
  const urlParams = {
    params: {
      size: 10000,
    },
  };

  let apiUrl = `/pipelines`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

pipelineActions.getPipelinesV3 = async (getAccessToken, cancelTokenSource, pipelineFilterModel, searchTerm, type, fields, active = true) => {
  const apiUrl = `/pipelines/v2`;
  const sortOption = pipelineFilterModel?.getData("sortOption");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      order: sortOption ? sortOption.order : undefined,
      size: pipelineFilterModel?.getData("pageSize"),
      page: pipelineFilterModel?.getData("currentPage"),
      type: type !== 'all' && type !== null ? type : undefined,
      search: searchTerm ? searchTerm : pipelineFilterModel?.getFilterValue("search"),
      owner: pipelineFilterModel?.getFilterValue("owner"),
      tag: pipelineFilterModel?.getFilterValue("tag"),
      active: active,
      fields: fields
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

// TODO: Remove when all references are updated
pipelineActions.delete = async (pipelineId, getAccessToken) => {
  const apiUrl = `/pipelines/${pipelineId}/delete`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

pipelineActions.deletePipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/delete`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.run = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/run/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.runPipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/run/`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

//new-start which first resets the pipeline and then triggers a fresh run all in a single API call
pipelineActions.newStart = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/new-start/`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.triggerPipelineNewStartV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/new-start/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.resumePipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/resume`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.stopPipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/stop/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.resetPipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/reset/`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.updatePipeline = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/update/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.transferPipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId, newOwnerId) => {
  const apiUrl = `/pipelines/${pipelineId}/update/`;
  const postBody = {
    owner: newOwnerId
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

pipelineActions.get = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.saveToVault = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/vault";   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.deleteFromVaultUsingVaultKey = async (vaultId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/vault/${vaultId}`;
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.saveToolRegistryRecordToVault = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/vault/tool/";   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.saveToolRegistryRecordToVaultV2 = async (postBody, getAccessToken, cancelTokenSource) => {
  const apiUrl = "/vault/tool/";   
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

pipelineActions.createJob = async (toolId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/action/${toolId}/createjob`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

//TODO: This should replace createJob above as this logic will lookup the settings in the pipeline, run create job and then update pipeline with job name.
pipelineActions.processStepJob = async (pipelineId, stepId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/action/jenkins/process-step-job?step=${stepId}`;
  const response = await axiosApiService(accessToken).put(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.duplicate = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/duplicate/`;   
  const response = await axiosApiService(accessToken).put(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.duplicatePipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/duplicate/`;
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.publishPipelineV2 = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/publish-template/`;
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.publish = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/publish-template/`;
  const response = await axiosApiService(accessToken).put(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.getLogs = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/status`;   
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.deployTemplateV2 = async (getAccessToken, cancelTokenSource, templateId) => {
  const apiUrl = `/pipelines/deploy/${templateId}`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.approve = async (templateId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${templateId}/approve`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.deny = async (templateId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${templateId}/deny`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.createFreeTrialPipeline = async (postBody, getAccessToken) => {
  console.log("inside pipeline acitons");
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/freetrial/postcommit`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

// TODO: If we're doing different metrics, they should be different routes, not one route coupled with other unrelated routes.
// TODO: We should be handling not getting data inside the places that call this route instead
//  We can always have a function in a helper that does the parsing of data automatically and call that instead
pipelineActions.searchWorkSpaces = async (service, gitAccountId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/properties`;
  const postBody = {
    tool: service,
    metric: "getWorkSpaces",
    gitAccountId: gitAccountId,
  };
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {
      if (result.data) {
        let arrOfObj = result.data.data;
        return arrOfObj;
      }
      else {
        throw "Tool workspaces information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
      }
    })
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.searchWorkspacesV2 = async (getAccessToken, cancelTokenSource, service, gitAccountId) => {
  const apiUrl = `/tools/properties`;
  const postBody = {
    tool: service,
    metric: "getWorkSpaces",
    gitAccountId: gitAccountId,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: We should be handling not getting data inside the places that call this route instead
//  We can always have a function in a helper that does the parsing of data automatically and call that instead
pipelineActions.searchRepositories = async (service, gitAccountId, workspaces, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/properties`;
  const postBody = {
    tool: service,
    metric: "getRepositories",
    gitAccountId: gitAccountId,
    workspaces: workspaces,
  };
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {
      if (result.data) {
        let arrOfObj = result.data.data;
        return arrOfObj;
      }
      else {
        throw "Tool repositories information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
      }
    })
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.subscribeToPipeline = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/subscribe`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.unsubscribeFromPipeline = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/unsubscribe`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.isSubscribed = async (getAccessToken, cancelTokenSource, pipelineId) => {
  const apiUrl = `/pipelines/${pipelineId}/is_subscribed`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.getSubscribedPipelines = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/pipelines/subscriptions/pipelines`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.getSubscribedPipelineIds = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/pipelines/subscriptions/ids`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineActions.deleteJenkinsJob = async (deleteObj, getAccessToken) => {
  console.log(deleteObj);
  let apiUrl = `/pipelines/deletejob`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, deleteObj);
};

pipelineActions.createCoverityJob = async (toolId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/action/${toolId}/createCoverityJob`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.createTwistlockJob = async (toolId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/action/${toolId}/createTwistlockJob`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.createMongodbRealmJob = async (toolId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/action/${toolId}/createMongodbRealmJob`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.createMongodbRealmJobV2 = async (getAccessToken, cancelTokenSource, toolId, postBody) => {
  const apiUrl = `/registry/action/${toolId}/createMongodbRealmJob`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default pipelineActions;
