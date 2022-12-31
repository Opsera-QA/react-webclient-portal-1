import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const pipelineHelper = {};

pipelineHelper.getManagementScreenLink = () => {
  return `/workflow`;
};

pipelineHelper.getDetailViewLink = (pipelineId) => {
  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return `/workflow/details/${pipelineId}/summary`;
};

pipelineHelper.getPipelineOrientation = (pipeline) => {
  const restingStepId = DataParsingHelper.parseNestedMongoDbId(pipeline, "workflow.last_step.step_id");

  if (isMongoDbId(restingStepId) === true) {
    const stepIndex = PipelineHelpers.getStepIndex(pipeline, restingStepId);
    const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
    const stepCount = plan.length;

    if (stepIndex !== -1) {
      if (stepIndex + 1 === stepCount) {
        return "end";
      } else {
        return "middle";
      }
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

pipelineHelper.getStepIndexFromPlan = (plan, stepId) => {
  const parsedStepId = DataParsingHelper.parseMongoDbId(stepId);
  const parsedPlan = DataParsingHelper.parseArray(plan);

  if (!parsedStepId || !parsedPlan) {
    return -1;
  }

  return parsedPlan.findIndex((pipelineStep) => pipelineStep?._id === stepId);
};
