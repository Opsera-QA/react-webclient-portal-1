import baseActions from "utils/actionsBase";

const analyticsDataActions = {};

analyticsDataActions.deleteAnalyticsDataEntryV2 = async (getAccessToken, cancelTokenSource, analyticsDataEntryId) => {
  const apiUrl = `/analytics/data-entry/${analyticsDataEntryId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsDataActions.updateAnalyticsDataEntryV2 = async (getAccessToken, cancelTokenSource, analyticsDataEntryModel) => {
  let postBody = {
    ...analyticsDataEntryModel.getPersistData(),
  };
  const apiUrl = `/analytics/data-entry/${analyticsDataEntryModel.getData("_id")}/update/`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

analyticsDataActions.getAllAnalyticsDataEntriesV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/data-entry";
  const urlParams = {
    params: {
      size: 10000,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

analyticsDataActions.getAnalyticsDataEntriesV2 = async (getAccessToken, cancelTokenSource, analyticsDataEntryFilterDto) => {
  let sortOption = analyticsDataEntryFilterDto?.getData("sortOption");

  const apiUrl = "/analytics/data-entry";
  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: analyticsDataEntryFilterDto?.getData("pageSize"),
      page: analyticsDataEntryFilterDto?.getData("currentPage"),
      kpi_identifier: analyticsDataEntryFilterDto?.getData("identifier"),
      search: analyticsDataEntryFilterDto?.getData("search")
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

analyticsDataActions.getAnalyticsDataEntryV2 = async (getAccessToken, cancelTokenSource, analyticsDataEntryId) => {
  const apiUrl = `/analytics/data-entry/${analyticsDataEntryId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsDataActions.createAnalyticsDataEntryV2 = async (getAccessToken, cancelTokenSource, analyticsDataEntryModel) => {
  let postBody = {
    ...analyticsDataEntryModel.getPersistData(),
  };
  const apiUrl = "/analytics/data-entry/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default analyticsDataActions;