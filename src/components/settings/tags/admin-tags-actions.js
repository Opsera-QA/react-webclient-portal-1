import baseActions from "utils/actionsBase";

const adminTagsActions = {};

adminTagsActions.delete = async (tagId, getAccessToken) => {
  const apiUrl = `/tags/${tagId}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

adminTagsActions.update = async (tagDataDto, getAccessToken) => {
  let postBody = {
    ...tagDataDto.getPersistData(),
  };
  const apiUrl = `/tags/${tagDataDto.getData("_id")}/update/`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

// Remove after wiring up V2
adminTagsActions.getAllTags = async (getAccessToken) => {
  const apiUrl = "/tags";
  const urlParams = {
    params: {
      size: 10000,
    },
  };
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

adminTagsActions.getAllTagsV2 = async (getAccessToken, cancelTokenSource, status = "active") => {
  const apiUrl = "/tags";
  const urlParams = {
    params: {
      size: 10000,
      status: status,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

adminTagsActions.getTags = async (getAccessToken, cancelTokenSource, tagFilterDto) => {
  let sortOption = tagFilterDto.getData("sortOption");
  let type = tagFilterDto.getData("type");
  let status = tagFilterDto.getData("status");

  const apiUrl = "/tags";
  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: tagFilterDto.getData("pageSize"),
      page: tagFilterDto.getData("currentPage"),
      type: type ? type.value : undefined,
      status: status ? status.value : undefined,
      search: tagFilterDto.getData("search")
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

adminTagsActions.getProjectTags = async (getAccessToken) => {
  const apiUrl = "/tags";
  const urlParams = {
    params: {
      size: 10000,
      page: 1,
      sort: "type",
      type: "project"
    },
  };
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

adminTagsActions.getVisibleTags = async (getAccessToken) => {
  const apiUrl = "/tags?status=active";
  const urlParams = {
    params: {
      size: 100,
      page: 1,
    },
  };
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

adminTagsActions.getTag = async (getAccessToken, cancelTokenSource, tagId) => {
  const apiUrl = `/tags/${tagId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

// TODO: Remove when all references are updated to createTagV2
adminTagsActions.create = async (tagDataDto, getAccessToken) => {
  let postBody = {
    ...tagDataDto.getPersistData(),
  };
  const apiUrl = "/tags/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

adminTagsActions.createTagV2 = async (getAccessToken, cancelTokenSource, tagDataDto) => {
  let postBody = {
    ...tagDataDto.getPersistData(),
  };
  const apiUrl = "/tags/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

adminTagsActions.getRelevantPipelinesV2 = async (getAccessToken, cancelTokenSource, tags) => {
  const apiUrl = `/reports/pipelines/tags`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, tags);
};

adminTagsActions.getRelevantToolsV2 = async (getAccessToken, cancelTokenSource, tags) => {
  const apiUrl = `/reports/tools/tags`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, tags);
};

// TODO: This should be moved into that input component
adminTagsActions.configurationOptions = [
  {id: "costCenter", label: "Cost Center"}
];

export default adminTagsActions;