import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const taskHelper = {};

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

