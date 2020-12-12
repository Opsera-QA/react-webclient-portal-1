import {axiosApiService} from "../../api/apiService";
import baseActions from "../../utils/actionsBase";

const pipelineActions = {};

pipelineActions.getPipelines = async (pipelineFilterDto, type, getAccessToken) => {
  let sortOption = pipelineFilterDto.getData("sortOption");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : null,
      order: sortOption ? sortOption.order : null,
      size: pipelineFilterDto.getData("pageSize"),
      page: pipelineFilterDto.getData("currentPage"),
      type: type !== 'all' && type !== null ? type : undefined,
      // status: pipelineFilterDto.getData("status"),
      // search: pipelineFilterDto.getData("search"),
      // owner: pipelineFilterDto.getData("owner"),
    },
  };

  let apiUrl = `/pipelines`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

pipelineActions.getAllPipelines = async (getAccessToken) => {
  const urlParams = {
    params: {
      sort: "name",
      order: 1
    },
  }

  let apiUrl = `/pipelines`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

pipelineActions.delete = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
};

pipelineActions.run = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/run/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.resume = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/resume`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.stop = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/stop/`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.reset = async (pipelineId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/reset/`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.updatePipeline = async (pipelineId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/update/`;   
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.transferPipeline = async (pipelineId, newOwnerId, getAccessToken) => {
  const postBody = {
    owner: newOwnerId
  };

  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/${pipelineId}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
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

pipelineActions.deployTemplate = async (templateId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/deploy/${templateId}`;
  const postBody = {};
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
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
  console.log("inside pipeline acitons")
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/freetrial/postcommit`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.getToolsList = async (service, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/properties/${service}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {
      if (result.data) {
        let respObj = [];
        let arrOfObj = result.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        return respObj;
      }
      else {
        throw "Tool information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
      }
    })
    .catch(error => {throw { error };});
  return response;
};

pipelineActions.getToolIdentifierList = async (getAccessToken) => {
  const params = { status: "active", usage: "pipeline"};
  const apiUrl = `/registry/tools`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, params);
};

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

pipelineActions.searchBranches = async (service, gitAccountId, repoId, workspaces, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/properties`;
  const postBody = {
    tool: service,
    metric: "getBranches",
    gitAccountId: gitAccountId,
    repoId: repoId,
    workspaces: workspaces,
  };
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {
      if (result.data) {
        let arrOfObj = result.data.data;
        let response = arrOfObj.map(function(el) {
          let o = Object.assign({});
          o.value = el;
          o.name = el;
          return o;
        });
        return response;
      }
      else {
        throw "Tool repositories information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
      }
    })
    .catch(error => {throw { error };});
  return response;
};

export default pipelineActions;