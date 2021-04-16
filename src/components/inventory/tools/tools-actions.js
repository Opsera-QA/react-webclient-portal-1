import baseActions from "utils/actionsBase";
import pipelineActions from "components/workflow/pipeline-actions";

const toolsActions = {};

toolsActions.checkToolConnectivity = async (toolId, toolName, getAccessToken) => {
  const apiUrl = `/tools/${toolId}/check-connectivity?name=${toolName}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.deleteTool = async (dataObject, getAccessToken) => {
  const apiUrl = `/registry/${dataObject.getData("_id")}`;
  return baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

toolsActions.deleteVaultRecordsForToolId = async (toolDataDto,getAccessToken) => {
  const apiUrl = `/vault/delete`;
  let id = toolDataDto.getData("_id");
  let postBody = {
    id : id
  };
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolsActions.deleteOwnerVaultRecordsForToolId = async (toolDataDto,getAccessToken) => {
  const apiUrl = `/vault/tool/delete`;
  let id = toolDataDto.getData("_id");
  let postBody = {
    id : id
  };
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolsActions.updateTool = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  };
  let id = toolDataDto.getData("_id");
  const apiUrl = `/registry/${id}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolsActions.updateToolV2 = async (getAccessToken, cancelTokenSource, toolDataDto) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  };
  let id = toolDataDto.getData("_id");
  const apiUrl = `/registry/${id}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolsActions.createTool = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  };
  const apiUrl = "/registry/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolsActions.createToolV2 = async (getAccessToken, cancelTokenSource, toolDataDto) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  };
  const apiUrl = "/registry/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: Replace with getToolIdentifiersV2 when all references are updated
toolsActions.getTools = async (getAccessToken) => {
  const apiUrl = "/registry/tools";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getRoleLimitedToolRegistryListV2 = async (getAccessToken, cancelTokenSource, toolFilterDto) => {
  let sortOption = toolFilterDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: toolFilterDto.getData("currentPage"),
      size: toolFilterDto.getData("pageSize"),
      tag: toolFilterDto.getFilterValue("tag"),
      status: toolFilterDto.getFilterValue("status"),
      tool: toolFilterDto.getFilterValue("toolIdentifier"),
      search: toolFilterDto.getFilterValue("search"),
      owner: toolFilterDto.getFilterValue("owner")
    }
  };

  const apiUrl = `/registry/configs`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolsActions.getFullRoleLimitedToolRegistryList = async (getAccessToken) => {
  let urlParams = {
    params: {
      sort: "name",
      size: 10000,
    }
  };


  const apiUrl = `/registry/configs`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

toolsActions.getFullToolRegistryList = async (getAccessToken) => {
  let urlParams = {
    params: {
      sort: "name",
      size: 10000,
    }
  };

  const apiUrl = `/registry`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

toolsActions.getFullToolById = async (id, getAccessToken) => {
  const apiUrl = `/registry/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getRoleLimitedToolById = async (id, getAccessToken) => {
  const apiUrl = `/registry/configs/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getRoleLimitedToolByIdV2 = async (id, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/registry/configs/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

// TODO: Remove when all references are updated to V2
toolsActions.getToolLovs = async (getAccessToken) => {
  const apiUrl = `/registry/configs/summary`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getToolLovsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/registry/configs/summary`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

// TODO: Remove when all references are updated to V2
toolsActions.getRelevantPipelines = async (toolDto, getAccessToken) => {
  const apiUrl = `/registry/${toolDto.getData("_id")}/pipelines`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getRelevantPipelinesV2 = async (getAccessToken, cancelTokenSource, toolDto) => {
  const apiUrl = `/registry/${toolDto.getData("_id")}/pipelines`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.updateToolConfiguration = async (toolData, getAccessToken) => {
  const apiUrl = `/registry/${toolData._id}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, toolData);
};

toolsActions.installJiraApp = async (toolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/app/install`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Should this be in a different area considering it's used in more places than just tools? Rename to three part vault key
// Note: This is used for three part vault keys (tool ID, identifier, and key)
toolsActions.savePasswordToVault = async (toolData, toolConfigurationData, fieldName, value, getAccessToken) => {
  if (toolConfigurationData.isChanged(fieldName) && value != null && typeof(value) === "string") {
    const toolId = toolData.getData("_id");
    const toolIdentifier = toolData.getData("tool_identifier");
    const keyName = `${toolId}-${toolIdentifier}-${fieldName}`;
    const body = { "key": `${keyName}`, "value": value, "toolId": toolId };
    const response = await pipelineActions.saveToolRegistryRecordToVault(body, getAccessToken);
    return response?.status === 200 ? { name: "Vault Secured Key", vaultKey: keyName } : {};
  }

  // Faseeh says all vault values MUST be objects and not strings
  let currentValue = toolConfigurationData.getData(fieldName);
  return typeof currentValue === "string" ? {} : currentValue;
};

toolsActions.saveKeyPasswordToVault = async (toolConfigurationData, fieldName, value, key, getAccessToken, toolId) => {
  if (toolConfigurationData.isChanged(fieldName) && value != null && typeof(value) === "string") {
    const body = { "key": key, "value": value, "toolId": toolId };
    const response = await pipelineActions.saveToolRegistryRecordToVault(body, getAccessToken);
    return response?.status === 200 ? { name: "Vault Secured Key", vaultKey: key } : {};
  }

  // Faseeh says all values MUST be objects and not strings
  let currentValue = toolConfigurationData.getData(fieldName);
  return typeof currentValue === "string" ? {} : currentValue;
};


toolsActions.saveToolConfiguration = async (toolData, configurationItem, getAccessToken) => {
  let newToolData = toolData.getPersistData();
  newToolData["configuration"] = configurationItem.configuration;
  return await toolsActions.updateToolConfiguration(newToolData, getAccessToken);
};


toolsActions.getToolCounts = async (getAccessToken) => {
  const apiUrl = `/reports/tools/counts`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getToolConnectionLog = async (getAccessToken, toolDataDto) => {
  const apiUrl = `/registry/log/${toolDataDto.getData("_id")}?page=1&size=10`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.checkSFDXToolConnection = async (getAccessToken, toolDataDto, selectedJenkinsId) => {
  // console.log(toolDataDto);
  const postBody = {
    "jenkinsToolId": selectedJenkinsId,
    "sfdcToolId": toolDataDto.getData("_id"),
    "tool": "sfdc"
  };
  const apiUrl = `/tools/sfdc/check-connectivity`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

toolsActions.getScmReviewers = async (getAccessToken, postBody) => {  
  const apiUrl = `/connectors/bitbucket/getReviewers`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

export default toolsActions;