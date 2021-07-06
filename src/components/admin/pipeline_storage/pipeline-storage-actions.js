import baseActions from "utils/actionsBase";

const PipelineStorageActions = {};
const defaultFields = ["pipelineId", "stepId", "customerId", "runCount", "dataType", "createdAt"];

PipelineStorageActions.getPipelineStorageRecordsV2 = async (getAccessToken, cancelTokenSource, kpiFilterDto, fields = defaultFields) => {
  const apiUrl = "/pipelines/storage/v2";

  const urlParams = {
    params: {
      // size: kpiFilterDto?.getData("pageSize"),
      // page: kpiFilterDto?.getData("currentPage"),
      search: kpiFilterDto?.getFilterValue("search"),
      fields: fields
    },
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

PipelineStorageActions.getPipelineStorageRecordByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/pipelines/storage/v2/${id}/`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

PipelineStorageActions.deletePipelineStorageDataV2 = async (getAccessToken, cancelTokenSource, pipelineStorageData) => {
  const apiUrl = `/pipelines/storage/v2/${pipelineStorageData?.getData("_id")}/`;
  return baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default PipelineStorageActions;
