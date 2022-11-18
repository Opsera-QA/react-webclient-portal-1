import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const pipelineInstructionsHelper = {};

pipelineInstructionsHelper.getDetailViewLink = (
  pipelineInstructionsId,
  ) => {
  if (isMongoDbId(pipelineInstructionsId) !== true) {
    return null;
  }

  return `/workflow/catalog/instructions/${pipelineInstructionsId}`;
};

pipelineInstructionsHelper.getManagementScreenLink = () => {
  return `/workflow/catalog/instructions/`;
};