import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const toolHelper = {};

toolHelper.getModelDetailViewLink = (toolModel) => {
  if (toolModel == null) {
    return null;
  }

  const toolId = toolModel?.getMongoDbId();

  if (isMongoDbId(toolId) !== true) {
    return `/inventory/tools`;
  }

  return toolHelper.getDetailViewLink(toolId);
};

toolHelper.getDetailViewLink = (toolId) => {
  if (isMongoDbId(toolId) !== true) {
    return null;
  }

  return `/inventory/tools/details/${toolId}`;
};