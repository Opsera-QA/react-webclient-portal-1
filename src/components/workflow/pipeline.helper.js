import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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

pipelineHelper.getPipelineStatus = (pipeline) => {
  const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_step.status");
  const paused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");

  if (paused === true) {
    return "paused";
  }

  return status;
};