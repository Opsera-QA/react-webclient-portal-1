import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const pipelineHelper = {};

pipelineHelper.getManagementScreenLink = () => {
  return `/workflow`;
};

pipelineHelper.getDetailViewLink = (pipelineId, activeTab = "summary") => {
  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return `/workflow/details/${pipelineId}/${activeTab}`;
};

pipelineHelper.getLastEnabledStepId = (pipelineSteps) => {
  const parsedPipelineSteps = DataParsingHelper.parseArray(pipelineSteps, []);

  let lastEnabledStepId = undefined;

  parsedPipelineSteps.forEach((pipelineStep) => {
    if (pipelineStep?.active === true) {
      lastEnabledStepId = pipelineStep?._id;
    }
  });

  return lastEnabledStepId;
};

pipelineHelper.getPipelineOrientation = (pipeline) => {
  const restingStepId = DataParsingHelper.parseNestedMongoDbId(pipeline, "workflow.last_step.step_id");

  if (isMongoDbId(restingStepId) === true) {
    const stepIndex = PipelineHelpers.getStepIndex(pipeline, restingStepId);
    const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
    const stepCount = plan.length;
    const lastEnabledStepId = pipelineHelper.getLastEnabledStepId(plan);

    if (isMongoDbId(lastEnabledStepId) === true && lastEnabledStepId === restingStepId) {
      return "end";
    }

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

pipelineHelper.getTagValueForStep = (step) => {
  const parsedStep = DataParsingHelper.parseObject(step, {});
  const parsedMongoDbId = DataParsingHelper.parseMongoDbId(parsedStep?._id);
  const parsedName = DataParsingHelper.parseString(parsedStep?.name);

  if (!parsedMongoDbId || !parsedName) {
    return undefined;
  }

  let transformedName = parsedName.trim();
  transformedName = transformedName.replaceAll(' ', '-');
  transformedName = transformedName.replace(/[^A-Za-z0-9-.]/gi, '');
  transformedName = transformedName.toLowerCase();

  return `${transformedName}_${parsedMongoDbId}`;
};
