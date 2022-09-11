import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const taskHelper = {};

taskHelper.getDetailViewLink = (taskId) => {
  if (isMongoDbId(taskId) !== true) {
    return null;
  }

  return `/task/details/${taskId}`;
};

