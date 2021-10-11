import { axiosApiService } from "../../../../../../api/apiService";
import baseActions from "../../../../../../utils/actionsBase";

const octopusActions = {};

octopusActions.getOctopusApplicationsV2 = async (getAccessToken, cancelTokenSource, toolID) => {
  const apiUrl = `tools/${toolID}/octopus/v2/applications`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

octopusActions.deleteOctopusApplication = async (toolID, type, getAccessToken, appID, octopusApplicationDto) => {
  const postBody = {
    data: octopusApplicationDto.getPersistData(),
    type: "delete",
    item: type,
  };
  const accessToken = await getAccessToken();
  const apiUrl = `registry/action/octopus/${toolID}/create-app/${appID}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

octopusActions.updateOctopusApplication = async (octopusApplicationDto, type, getAccessToken, appID) => {
  const postBody = {
    data: octopusApplicationDto.getPersistData(),
    type: "update",
    item: type,
  };
  const accessToken = await getAccessToken();
  const toolID = octopusApplicationDto.data.toolId;
  const apiUrl = `registry/action/octopus/${toolID}/create-app/${appID}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

octopusActions.createOctopusApplication = async (toolDataDto, type, getAccessToken) => {
  const postBody = {
    data: toolDataDto.getPersistData(),
    type: "create",
    item: type,
  };
  const accessToken = await getAccessToken();
  const toolID = toolDataDto.data.toolId;
  const apiUrl = `registry/action/octopus/${toolID}/create-app`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

octopusActions.createOctopusProject = async (toolDataDto, getAccessToken) => {
  const postBody = {
    data: toolDataDto,
    type: "create",
    item: "project",
  };
  const apiUrl = `registry/action/octopus/create-app`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

octopusActions.fetchIisThumbprint = async (toolID, getAccessToken, cancelTokenSource) => {  
  const apiUrl = `tools/octopus/${toolID}/thumbprint`;  
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

octopusActions.validateIisConfig = async (toolDataDto, getAccessToken, cancelTokenSource) => {
  const toolID = toolDataDto.data.toolId;
  const postBody = {
    data: toolDataDto.getPersistData()    
  };
  const apiUrl = `registry/action/octopus/${toolID}/validate-iis-config`;  
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

octopusActions.getAzureClusters = async (getAccessToken, cancelTokenSource, config, resource) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody ={
    "owner": owner,
    // "clientId": applicationData?.clientId?.vaultKey,
    // "clientSecret": applicationData?.clientSecret?.vaultKey,
    "clientId": cfg?.applicationId?.vaultKey,
    "clientSecret": cfg?.applicationPassword?.vaultKey,
    "tenantId": cfg?.tenantId?.vaultKey,
    "subscriptionId": cfg?.subscriptionId?.vaultKey,
    "resource": resource
  };
  const apiURL = `tools/azure/management/clusterNames`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

octopusActions.getAzureResourceGroups = async (getAccessToken, cancelTokenSource, config, resource) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody ={
    "owner": owner,
    // "clientId": applicationData?.clientId?.vaultKey,
    // "clientSecret": applicationData?.clientSecret?.vaultKey,
    "clientId": cfg?.applicationId?.vaultKey,
    "clientSecret": cfg?.applicationPassword?.vaultKey,
    "tenantId": cfg?.tenantId?.vaultKey,
    "subscriptionId": cfg?.subscriptionId?.vaultKey,
    "resource": resource
  };
  const apiURL = `tools/azure/management/resourceGroups`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

octopusActions.getAzureRegistries = async (getAccessToken, cancelTokenSource, config ,applicationData) => {
  const cfg = config?.configuration;
  const owner = config?.owner;
  const postBody ={
    "owner": owner,
    "clientId": applicationData?.clientId?.vaultKey,
    "clientSecret": applicationData?.clientSecret?.vaultKey,
    "tenantId": cfg?.tenantId?.vaultKey,
    "subscriptionId": cfg?.subscriptionId?.vaultKey,
    "resource": applicationData?.resource
  };
  const apiURL = `tools/azure/acr/registryList`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiURL, postBody);
};

octopusActions.createOctopusDeploymentProcess = async (toolDataDto, getAccessToken) => {
  const postBody = {
    data: toolDataDto,
    type: "create",
    item: "process",
  };
  const apiUrl = `registry/action/octopus/create-app`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

octopusActions.createOctopusVariables = async (toolDataDto, getAccessToken) => {
  const postBody = {
    data: toolDataDto,
    type: "create",
    item: "variable",
  };
  const apiUrl = `registry/action/octopus/create-app`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

export default octopusActions;
