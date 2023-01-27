import baseActions from "utils/actionsBase";

const analyticsDataActions = {};

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
  const apiUrl = "/analytics/data-entry";
  const urlParams = {
    params: {
      sort: analyticsDataEntryFilterDto?.getFilterValue("sortOption"),
      size: analyticsDataEntryFilterDto?.getFilterValue("pageSize"),
      page: analyticsDataEntryFilterDto?.getFilterValue("currentPage"),
      kpi_identifier: analyticsDataEntryFilterDto?.getFilterValue("identifier"),
      search: analyticsDataEntryFilterDto?.getData("search")
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};
export default analyticsDataActions;