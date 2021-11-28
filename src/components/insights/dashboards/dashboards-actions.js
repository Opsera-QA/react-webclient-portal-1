import baseActions from "utils/actionsBase";

const dashboardsActions = {};

dashboardsActions.getDashboardByIdV2 = async(getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/analytics/dashboard/${id}`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
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
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardsActions.getTopFiveDashboardsV2 = async(getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/dashboard";

  let urlParams = {
    params: {
      sort: "lastupdated",
      page: 1,
      size: 7,
      active: true,
      favorites: true,
    }
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};


dashboardsActions.getAllDashboardsLovV2 = async(getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/dashboard";

  let urlParams = {
    params: {
      size: 10000,
    }
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardsActions.createDashboardV2 = async(getAccessToken, cancelTokenSource, dashboardModel) => {
  const apiUrl = "/analytics/dashboard/create";
  const postData = {
    ...dashboardModel.getPersistData()
  };

  return baseActions.apiPostCallV2(getAccessToken, apiUrl, postData);
};


dashboardsActions.updateDashboardV2 = async(getAccessToken, cancelTokenSource, dashboardModel) => {
  const apiUrl = `/analytics/dashboard/${dashboardModel?.getData('_id')}/update`;
  const postData = {
    ...dashboardModel?.getPersistData()
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dashboardsActions.deleteDashboardV2 = async(getAccessToken, cancelTokenSource, dashboardModel) => {
  const apiUrl = `/analytics/dashboard/${dashboardModel?.getData('_id')}`;
  return baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardsActions.updateFavorite = async(rowData, getAccessToken) => {
  const apiUrl = `/analytics/dashboard/${rowData._id}/update`;
  let postData = {
    ...rowData
  };
  return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

export default dashboardsActions;