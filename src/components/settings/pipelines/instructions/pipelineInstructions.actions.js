import baseActions from "utils/actionsBase";

export const pipelineInstructionsActions = {};

pipelineInstructionsActions.getPipelineInstructions = async (
  getAccessToken,
  cancelTokenSource,
  searchKeyword,
  type,
  ) => {
  const apiUrl = "/settings/pipelines/instructions";
  const urlParams = {
    params: {
      search: searchKeyword,
      type: type,
    },
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

pipelineInstructionsActions.getPipelineInstructionsById = async (
  getAccessToken,
  cancelTokenSource,
  id,
) => {
  const apiUrl = `/settings/pipelines/instructions/${id}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

pipelineInstructionsActions.createPipelineInstructions = async (
  getAccessToken,
  cancelTokenSource,
  pipelineInstructionsModel,
) => {
  const postBody = {
    ...pipelineInstructionsModel.getPersistData()
  };
  const apiUrl = "/settings/pipelines/instructions/create";
  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

pipelineInstructionsActions.updatePipelineInstructions = async (
  getAccessToken,
  cancelTokenSource,
  pipelineInstructionsModel,
) => {
  const id = pipelineInstructionsModel.getMongoDbId();
  const apiUrl = `/settings/pipelines/instructions/${id}/update`;
  const postBody = {
    ...pipelineInstructionsModel.getPersistData()
  };

  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

pipelineInstructionsActions.deletePipelineInstructionsById = async (
  getAccessToken,
  cancelTokenSource,
  pipelineInstructionsId,
) => {
  const apiUrl = `/settings/pipelines/instructions/${pipelineInstructionsId}`;
  return await baseActions.apiDeleteCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

pipelineInstructionsActions.transferPipelineInstructionsOwnership = async (
  getAccessToken,
  cancelTokenSource,
  pipelineInstructionsId,
  newOwnerId,
) => {
  const apiUrl = `/settings/pipelines/instructions/${pipelineInstructionsId}/transfer/user/${newOwnerId}`;
  return await baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

pipelineInstructionsActions.getPipelinesByPipelineInstructionsUsage = async (
  getAccessToken,
  cancelTokenSource,
  pipelineInstructionsId,
) => {
  const apiUrl = `/settings/pipelines/instructions/${pipelineInstructionsId}/pipelines/usage`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

pipelineInstructionsActions.getPipelineInstructionsByPipelineStep = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  pipelineStepId,
) => {
  const apiUrl = `/settings/pipelines/instructions/pipelines/${pipelineId}/step/${pipelineStepId}`;
  return await baseActions.apiGetCallV3(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};