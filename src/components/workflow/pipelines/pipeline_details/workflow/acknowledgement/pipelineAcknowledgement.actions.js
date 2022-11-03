import baseActions from "utils/actionsBase";

export const pipelineAcknowledgementActions = {};

pipelineAcknowledgementActions.acknowledgePipelineInstructions = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  pipelineStepId,
  message,
) => {
  const apiUrl = `/pipelines/${pipelineId}/step/${pipelineStepId}/acknowledge`;
  const postBody = {
    message: message,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

pipelineAcknowledgementActions.refusePipelineInstructionsAcknowledgement = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  pipelineStepId,
  message,
) => {
  const apiUrl = `/pipelines/${pipelineId}/step/${pipelineStepId}/refuse`;
  const postBody = {
    message: message,
  };

  return await baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};