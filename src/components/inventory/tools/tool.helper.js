import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const toolHelper = {};

toolHelper.getDetailViewLink = (toolId) => {
  if (isMongoDbId(toolId) !== true) {
    return null;
  }

  return `/inventory/tools/details/${toolId}`;
};