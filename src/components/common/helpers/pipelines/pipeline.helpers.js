import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const pipelineHelpers = {};

pipelineHelpers.getPipelineSteps = (pipeline) => {
  const parsedPipeline = dataParsingHelper.parseObject(pipeline, undefined);

  if (!parsedPipeline) {
    throw "Did not receive a Pipeline object";
  }

  const pipelineSteps = dataParsingHelper.parseArray(pipeline?.workflow?.plan, undefined);

  if (!pipelineSteps) {
    throw "The Pipeline did not have any steps associated with it.";
  }

  return pipelineSteps;
};

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

export const getArtifactorySteps = (plan, stepId, toolIdentifierArray) => {

  const elegibleSteps = plan.slice(
    0,
    plan.findIndex((element) => element._id === stepId)
  );

  if (!Array.isArray(elegibleSteps)) {
    return [];
  }

  if (toolIdentifierArray && toolIdentifierArray.length > 0) {
    return elegibleSteps?.filter((step) => step?.active && toolIdentifierArray.includes(step?.tool?.tool_identifier));
  }

  return elegibleSteps;

};
