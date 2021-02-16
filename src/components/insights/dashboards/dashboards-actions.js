import baseActions from "../../../utils/actionsBase";

const dashboardsActions = {};

dashboardsActions.create = async(dashboardDataDto, getAccessToken) => {
    const apiUrl = "/analytics/dashboard/create";
    let postData = {
      ...dashboardDataDto.getPersistData()
    }
    return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

dashboardsActions.get = async(id, getAccessToken) => {
    const apiUrl = `/analytics/dashboard/${id}`
    return baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Remove when all references updated to V2
dashboardsActions.getAll = async(dashboardFilterDto, getAccessToken) => {
    const apiUrl = "/analytics/dashboard";
    let sortOption = dashboardFilterDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: dashboardFilterDto.getData("currentPage"),
      size: dashboardFilterDto.getData("pageSize"),
      tag: dashboardFilterDto.getFilterValue("tag"),
      status: dashboardFilterDto.getFilterValue("status"),
      tool: dashboardFilterDto.getFilterValue("toolIdentifier"),
      search: dashboardFilterDto.getFilterValue("search"),
      favorites: dashboardFilterDto.getFilterValue("isFavorite"),
      type: dashboardFilterDto.getFilterValue("type")
    }
  }

  return baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

dashboardsActions.getAllDashboardsV2 = async(getAccessToken, cancelTokenSource, dashboardFilterDto) => {
  const apiUrl = "/analytics/dashboard";
  let sortOption = dashboardFilterDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: dashboardFilterDto.getData("currentPage"),
      size: dashboardFilterDto.getData("pageSize"),
      tag: dashboardFilterDto.getFilterValue("tag"),
      status: dashboardFilterDto.getFilterValue("status"),
      tool: dashboardFilterDto.getFilterValue("toolIdentifier"),
      search: dashboardFilterDto.getFilterValue("search"),
      favorites: dashboardFilterDto.getFilterValue("isFavorite"),
      type: dashboardFilterDto.getFilterValue("type")
    }
  }

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardsActions.update = async(dashboardDataDto, getAccessToken) => {
    const apiUrl = `/analytics/dashboard/${dashboardDataDto.getData('_id')}/update`
    let postData = {
      ...dashboardDataDto.getPersistData()
    }
    return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
}

dashboardsActions.updateFavorite = async(rowData, getAccessToken) => {
  const apiUrl = `/analytics/dashboard/${rowData._id}/update`
  let postData = {
    ...rowData
  }
  return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
}

dashboardsActions.delete = async(dashboardDataDto, getAccessToken) => {
    const apiUrl = `/analytics/dashboard/${dashboardDataDto.getData('_id')}`
    return baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

export default dashboardsActions;