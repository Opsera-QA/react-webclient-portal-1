import baseActions from "utils/actionsBase";
import { addDays } from "date-fns";

const connectedAssetsBaseURL = "/analytics/connectedAssets/v1/";

const connectedAssetsActions = {};

connectedAssetsActions.getConnectedAssetsData = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

connectedAssetsActions.getListOfRepositories = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getSelectedRepoDetailedInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto,
  repository
) => {

  const apiURL = connectedAssetsBaseURL + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    selectedRepository: repository,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getPipelinesInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + 'pipelines/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getTasksInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + 'tasks/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

export default connectedAssetsActions;
