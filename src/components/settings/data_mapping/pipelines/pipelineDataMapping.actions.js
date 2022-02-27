import baseActions from "utils/actionsBase";

export const pipelineDataMappingActions = {};

pipelineDataMappingActions.getPipelineDataMappingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/mappings/pipeline/v2`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

pipelineDataMappingActions.getPipelineDataMappingByIdV2 = async (getAccessToken, cancelTokenSource, id) => {
  const apiUrl = `/mappings/pipeline/v2/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

pipelineDataMappingActions.createPipelineDataMappingV2 = async (getAccessToken, cancelTokenSource, pipelineDataMappingModel) => {
  const apiUrl = "/mappings/pipeline/v2/create";
  const postData = {
    ...pipelineDataMappingModel?.getPersistData(),
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

pipelineDataMappingActions.updatePipelineDataMappingV2 = async (getAccessToken, cancelTokenSource, pipelineDataMappingModel) => {
  const apiUrl = `/mappings/pipeline/v2/${pipelineDataMappingModel?.getData("_id")}/update`;
  const postData = {
    ...pipelineDataMappingModel?.getPersistData(),
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

pipelineDataMappingActions.deletePipelineDataMappingV2 = async (getAccessToken, cancelTokenSource, pipelineMappingId) => {
  const apiUrl = `/mappings/pipeline/v2/${pipelineMappingId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};