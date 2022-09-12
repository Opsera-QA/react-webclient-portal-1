import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineHelpers from "components/workflow/pipelineHelpers";

export const pipelineHelper = {};

pipelineHelper.getDetailViewLink = (pipelineId) => {
  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return `/workflow/details/${pipelineId}/summary`;
};

pipelineHelper.getPipelineOrientation = (pipeline) => {
  const restingStepId = pipeline?.workflow?.last_step?.step_id;

  if (isMongoDbId(restingStepId) === true) {
    const stepIndex = PipelineHelpers.getStepIndex(pipeline, restingStepId);

    if (stepIndex + 1 === Object.keys(pipeline.workflow.plan).length) {
      return "end";
    } else {
      return "middle";
    }
  }

  return "start";
};