import baseActions from "utils/actionsBase";
import pipelineActions from "components/workflow/pipeline-actions";

const toolsActions = {};

toolsActions.checkToolConnectivity = async (toolId, toolName, getAccessToken) => {
  const apiUrl = `/tools/${toolId}/check-connectivity?name=${toolName}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.deleteToolV2 = async (getAccessToken, cancelToken, toolModel) => {
  const apiUrl = `/registry/${toolModel?.getData("_id")}`;
  return baseActions.apiDeleteCallV2(getAccessToken, cancelToken, apiUrl);
};

toolsActions.updateToolV2 = async (getAccessToken, cancelTokenSource, toolModel) => {
  const id = toolModel?.getData("_id");
  const apiUrl = `/registry/${id}/update`;
  const postBody = {
    ...toolModel.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolsActions.createToolV2 = async (getAccessToken, cancelTokenSource, toolModel) => {
  const postBody = {
    ...toolModel?.getPersistData()
  };
  const apiUrl = "/registry/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

toolsActions.getRoleLimitedToolRegistryListV3 = async (getAccessToken, cancelTokenSource, toolFilterModel, fields) => {
  const apiUrl = `/registry/configs/v2`;

  const urlParams = {
    params: {
      sortOption: toolFilterModel?.getSortOption(),
      currentPage: toolFilterModel?.getFilterValue("currentPage"),
      pageSize: toolFilterModel?.getFilterValue("pageSize"),
      toolIdentifier: toolFilterModel?.getFilterValue("toolIdentifier"),
      tag: toolFilterModel?.getFilterValue("tag"),
      active: toolFilterModel?.getFilterValue("status"),
      search: toolFilterModel?.getFilterValue("search"),
      owner: toolFilterModel?.getFilterValue("owner"),
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolsActions.getToolAccessWithEmail = async (getAccessToken, cancelTokenSource, toolFilterModel, email) => {
  const sortOption = toolFilterModel?.getData("sortOption");
  const apiUrl = `/registry/configs/user/${email}`;
  const urlParams = {
    params: {
      sort: sortOption?.value,
      page: toolFilterModel.getData("currentPage"),
      size: toolFilterModel.getData("pageSize"),
      search: toolFilterModel.getFilterValue("search"),
      fields: ["name", "roles", "owner"]
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolsActions.getRoleLimitedToolByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/registry/configs/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.getRoleLimitedToolByIdV3 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/registry/configs/tool/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.getRoleLimitedTools = async (getAccessToken, cancelTokenSource, fields) => {
  const apiUrl = `/registry/configs/tools/`;
  const urlParams = {
    params: {
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolsActions.getRoleLimitedToolsByIdentifier = async (getAccessToken, cancelTokenSource, toolIdentifier, fields) => {
  const apiUrl = `/registry/configs/v2`;
  const urlParams = {
    params: {
      fields: fields,
      toolIdentifier: toolIdentifier,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolsActions.getToolLovsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/registry/configs/summary`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.getToolNameById = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/registry/configs/${toolId}/name`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.getToolLogs = async (getAccessToken, cancelTokenSource, toolId, toolLogFilterModel, fields) => {
  const apiUrl = `/registry/tools/${toolId}/logs/v2`;

  const urlParams = {
    params: {
      page: toolLogFilterModel?.getData("currentPage"),
      size: toolLogFilterModel?.getData("pageSize"),
      search: toolLogFilterModel?.getFilterValue("search"),
      fields: fields,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

toolsActions.getToolLogById = async (getAccessToken, cancelTokenSource, logId) => {
  const apiUrl = `/registry/logs/v2/${logId}`;

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.getRelevantPipelinesV2 = async (getAccessToken, cancelTokenSource, toolDto) => {
  const apiUrl = `/registry/${toolDto.getData("_id")}/pipelines`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

toolsActions.updateToolConfiguration = async (toolData, getAccessToken) => {
  const apiUrl = `/registry/${toolData._id}/update`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, toolData);
};

toolsActions.updateToolConfigurationV2 = async (toolData, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/registry/${toolData._id}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, toolData);
};

// TODO: This should be moved to a Jira helper function
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

// Note: This is used for three part vault keys (tool ID, identifier, and key)
toolsActions.saveThreePartToolPasswordToVaultV2 = async (getAccessToken, cancelTokenSource, toolData, toolConfigurationData, fieldName, value) => {
  if (toolConfigurationData.isChanged(fieldName) && value != null && typeof(value) === "string") {
    const toolId = toolData.getData("_id");
    const toolIdentifier = toolData?.getData("tool_identifier");
    const keyName = `${toolId}-${toolIdentifier}-${fieldName}`;
    const postBody = {
      key: keyName,
      value: value,
      toolId: toolId
    };

    const apiUrl = "/vault/tool/";
    const response = await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
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

// TODO: Make update route that just takes configuration and sets it into the mongo DB collection
toolsActions.saveToolConfiguration = async (toolData, configurationItem, getAccessToken) => {
  let newToolData = toolData.getPersistData();
  newToolData["configuration"] = configurationItem.configuration;
  return await toolsActions.updateToolConfiguration(newToolData, getAccessToken);
};

toolsActions.saveToolConfigurationV2 = async (toolData, configurationItem, getAccessToken, cancelTokenSource) => {
  let newToolData = toolData.getPersistData();
  newToolData["configuration"] = configurationItem.configuration;
  return await toolsActions.updateToolConfigurationV2(newToolData, getAccessToken, cancelTokenSource);
};


toolsActions.getToolCounts = async (getAccessToken) => {
  const apiUrl = `/reports/tools/counts`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.getToolConnectionLog = async (getAccessToken, toolDataDto) => {
  const apiUrl = `/registry/log/${toolDataDto.getData("_id")}?page=1&size=10`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Move to a Salesforce (DX) specific actions file
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

export default toolsActions;
