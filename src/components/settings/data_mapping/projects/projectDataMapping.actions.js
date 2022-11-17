import baseActions from "utils/actionsBase";

export const projectDataMappingActions = {};

projectDataMappingActions.getProjectDataMappingsV2 = async (getAccessToken, cancelTokenSource, toolFilterModel) => {
  const apiUrl = `/mappings/project/v2`;

  const urlParams = {
    params: {
      type: toolFilterModel?.getFilterValue("type"),
      status: toolFilterModel?.getFilterValue("status"),
      search: toolFilterModel?.getFilterValue("search")
    },
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

projectDataMappingActions.getProjectDataMappingByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/mappings/project/v2/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

projectDataMappingActions.createProjectDataMappingV2 = async (getAccessToken, cancelTokenSource, projectDataMappingModel) => {
  const apiUrl = "/mappings/project/v2/create";
  const postData = {
    ...projectDataMappingModel?.getPersistData(),
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

projectDataMappingActions.updateProjectDataMappingV2 = async (getAccessToken, cancelTokenSource, projectDataMappingModel) => {
  const apiUrl = `/mappings/project/v2/${projectDataMappingModel?.getData("_id")}/update`;
  const postData = {
    ...projectDataMappingModel?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

projectDataMappingActions.deleteProjectDataMappingV2 = async (getAccessToken, cancelTokenSource, projectMappingId) => {
  const apiUrl = `/mappings/project/v2/${projectMappingId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
