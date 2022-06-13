import baseActions from "utils/actionsBase";

const dashboardsActions = {};

dashboardsActions.getDashboardByIdV2 = async(getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/analytics/dashboards/${id}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardsActions.getAllDashboardsV2 = async(getAccessToken, cancelTokenSource, dashboardFilterModel) => {
  const apiUrl = "/analytics/dashboards";

  let urlParams = {
    params: {
      sort: dashboardFilterModel?.getFilterValue("sortOption"),
      page: dashboardFilterModel?.getFilterValue("currentPage"),
      size: dashboardFilterModel?.getFilterValue("pageSize"),
      tag: dashboardFilterModel?.getFilterValue("tag"),
      status: dashboardFilterModel?.getFilterValue("status"),
      tool: dashboardFilterModel?.getFilterValue("toolIdentifier"),
      owner: dashboardFilterModel?.getFilterValue("owner"),
      search: dashboardFilterModel?.getFilterValue("search"),
      favorites: dashboardFilterModel?.getFilterValue("isFavorite"),
      type: dashboardFilterModel?.getFilterValue("type")
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardsActions.getTopFiveDashboardsV2 = async(getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/dashboards";

  let urlParams = {
    params: {
      sort: "lastupdated",
      page: 1,
      size: 7,
      active: true,
      favorites: true,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};


dashboardsActions.getAllDashboardsLovV2 = async(getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/dashboards";

  let urlParams = {
    params: {
      size: 10000,
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

dashboardsActions.createDashboardV2 = async(getAccessToken, cancelTokenSource, dashboardModel) => {
  const apiUrl = "/analytics/dashboards/create";
  const postData = {
    ...dashboardModel.getPersistData()
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dashboardsActions.updateDashboardV2 = async (getAccessToken, cancelTokenSource, dashboardModel) => {
  const apiUrl = `/analytics/dashboards/${dashboardModel?.getData('_id')}/update`;
  const postData = {
    ...dashboardModel?.getPersistData()
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dashboardsActions.updateDashboardFiltersV2 = async (getAccessToken, cancelTokenSource, dashboardId, newDashboardFilters) => {
  const apiUrl = `/analytics/dashboards/${dashboardId}/filters/update`;
  const postData = {
    filters: newDashboardFilters,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postData,
  );
};

dashboardsActions.transferOwnershipToNewUserV2 = async(getAccessToken, cancelTokenSource, dashboardId, newOwnerId) => {
  const apiUrl = `/analytics/dashboards/${dashboardId}/transfer`;
  const postData = {
    newOwnerId: newOwnerId,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dashboardsActions.deleteDashboardV2 = async(getAccessToken, cancelTokenSource, dashboardModel) => {
  const apiUrl = `/analytics/dashboards/${dashboardModel?.getData('_id')}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

dashboardsActions.updateFavorite = async(rowData, getAccessToken) => {
  const apiUrl = `/analytics/dashboards/${rowData._id}/update`;
  let postData = {
    ...rowData
  };
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

export default dashboardsActions;