import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const pipelineHelper = {};

pipelineHelper.getDetailViewLink = (pipelineId) => {
  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return `/workflow/details/${pipelineId}/summary`;
};