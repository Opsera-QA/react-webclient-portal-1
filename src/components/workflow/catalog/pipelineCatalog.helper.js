import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const pipelineCatalogHelper = {};

pipelineCatalogHelper.getManagementScreenLink = () => {
  return `/workflow/catalog/library`;
};

pipelineCatalogHelper.getCustomerPipelineTemplateDetailViewLink = (templateId) => {
  if (isMongoDbId(templateId) !== true) {
    return null;
  }

  return `/workflow/catalog/customer/${templateId}`;
};