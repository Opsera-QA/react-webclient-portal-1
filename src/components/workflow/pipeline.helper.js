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

pipelineHelper.getStepIndexFromPipeline = (pipeline, stepId) => {
  const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan");
  return pipelineHelper.getStepIndexFromPlan(plan, stepId);
};

pipelineHelper.getStepIndexFromPlan = (plan, stepId) => {
  const parsedStepId = DataParsingHelper.parseMongoDbId(stepId);
  const parsedPlan = DataParsingHelper.parseArray(plan);

  if (!parsedStepId || !parsedPlan) {
    return -1;
  }

  return parsedPlan.findIndex((pipelineStep) => pipelineStep?._id === stepId);
};

pipelineHelper.getFirstPipelineStepIdentifier = (pipeline) => {
  const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
  const toolIdentifier = DataParsingHelper.parseNestedString(plan[0], "tool.tool_identifier");

  if (plan.length === 0) {
    return undefined;
  }

  return toolIdentifier;
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

pipelineHelper.getActiveStepCountFromPipeline = (pipeline) => {
  const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
  let count = 0;

  for (let i = 0; i < plan.length; i++) {
    const step = plan[i];

    if (step.active === true) {
      count += 1;
    }
  }

  return count;
};

pipelineHelper.getActiveStepIndex = (pipeline, stepId) => {
  const stepIndex = pipelineHelper.getStepIndexFromPipeline(pipeline, stepId);
  const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);

  if (stepIndex === -1 || plan.length === 0) {
    return -1;
  }

  let activeStepIndex = -1;

  for (let i = 0; i < plan.length; i++) {
    const step = plan[i];

    if (step.active === true) {
      activeStepIndex += 1;
    }

    if (step._id === stepId) {
      break;
    }
  }

  return activeStepIndex;
};

pipelineHelper.getRestingStepIdFromPipeline = (pipeline) => {
  return DataParsingHelper.parseNestedMongoDbId(pipeline, "workflow.last_step.step_id");
};

pipelineHelper.getPipelineCompletionPercentage = (pipeline) => {
  const lastStep = DataParsingHelper.parseNestedObject(pipeline, "workflow.last_step");

  if (!lastStep) {
    return 0;
  }

  const restingStepId = pipelineHelper.getRestingStepIdFromPipeline(pipeline);

  if (!restingStepId) {
    return 0;
  }

  const activeStepIndex = pipelineHelper.getActiveStepIndex(pipeline, restingStepId);

  if (activeStepIndex === -1) {
    return 0;
  }

  const activeStepCount = pipelineHelper.getActiveStepCountFromPipeline(pipeline);
  const isStepRunning = lastStep.status === "running";
  const isSuccess = DataParsingHelper.parseNestedMongoDbId(lastStep, "success.step_id") === restingStepId;
  const isPaused =
    DataParsingHelper.parseNestedBoolean(lastStep, "running.paused")
    || DataParsingHelper.parseNestedString(lastStep, "running.status") === "pending";
  const isFailed = DataParsingHelper.parseNestedMongoDbId(lastStep, "failed.step_id") === restingStepId;
  const finalStepIndex = isSuccess === true || (isStepRunning !== true && isPaused !== true && isFailed !== true) ? activeStepIndex + 1 : activeStepIndex;

  return Math.max(finalStepIndex / activeStepCount, 0);
};
