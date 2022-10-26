import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const pipelineInstructionsHelpers = {};

pipelineInstructionsHelpers.getDetailViewLink = (
  pipelineInstructionsId,
  ) => {
  if (isMongoDbId(pipelineInstructionsId) !== true) {
    return null;
  }

  return `/settings/pipelines/instructions/${pipelineInstructionsId}`;
};

pipelineInstructionsHelpers.getManagementScreenLink = () => {
  return `/settings/pipelines/instructions/`;
};