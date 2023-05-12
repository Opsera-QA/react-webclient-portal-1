import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export const taskHelper = {};

taskHelper.getManagementScreenLink = () => {
   return `/task`;
};

taskHelper.getModelDetailViewLink = (taskModel) => {
  if (taskModel == null) {
    return null;
  }

  const taskId = taskModel?.getMongoDbId();

  if (isMongoDbId(taskId) !== true) {
    return `/task`;
  }

  return taskHelper.getDetailViewLink(taskId);
};

taskHelper.getDetailViewLink = (taskId) => {
  if (isMongoDbId(taskId) !== true) {
    return null;
  }

  return `/task/details/${taskId}`;
};

taskHelper.getTaskCompletionPercentage = (task) => {
  return undefined;
};

taskHelper.getTaskColor = (state, themeConstants) => {
  switch (state) {
    case "paused":
      return themeConstants.COLOR_PALETTE.WARNING;
    case "running":
      return themeConstants.COLOR_PALETTE.GREEN;
    // case "failure":
    // case "failed":
    //   return themeConstants.COLOR_PALETTE.DANGER_RED;
    default:
      return themeConstants.RESOURCE_COLORS.TASKS;
  }
};