export const pipelineHelpers = {};

pipelineHelpers.findStepIndex = (pipeline, toolIdentifier) => {
  if (typeof pipeline !== "object" || !Array.isArray(pipeline?.workflow?.plan)) {
    return -1;
  }

  const pipelineSteps = pipeline?.workflow?.plan;

  return pipelineSteps?.findIndex((step) => step?.active && step?.tool?.tool_identifier === toolIdentifier);
};

pipelineHelpers.findFirstStepWithIdentifier = (pipeline, toolIdentifier) => {
  if (typeof pipeline !== "object" || typeof pipeline?.workflow !== "object" || !Array.isArray(pipeline?.workflow?.plan)) {
    return -1;
  }

  const pipelineSteps = pipeline?.workflow?.plan;
  return pipelineSteps?.find((step) => step?.active && step?.tool?.tool_identifier === toolIdentifier);
};