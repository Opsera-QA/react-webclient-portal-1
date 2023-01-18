import baseActions from "utils/actionsBase";

const RemoteApplicationActions = {};
const defaultFields = ["pipelineId", "stepId", "customerId", "runCount", "dataType", "createdAt"];

RemoteApplicationActions.getRemoteApplicationTelemetryRecordsV2 = async (getAccessToken, cancelTokenSource, kpiFilterDto, fields = defaultFields) => {
  const apiUrl = "/remote/telemetry";
  const urlParams = {
    params: {
      sort: kpiFilterDto?.getFilterValue("sortOption"),
      size: kpiFilterDto?.getFilterValue("pageSize"),
      page: kpiFilterDto?.getFilterValue("currentPage"),
      search: kpiFilterDto?.getFilterValue("search"),
    },
  };
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

RemoteApplicationActions.getRemoteApplicationTelemetryRecordByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/remote/telemetry/${id}/`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default RemoteApplicationActions;
