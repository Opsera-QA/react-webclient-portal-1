import modelHelpers from "components/common/model/modelHelpers";
import pipelineInstructionsAttributesMetadata
  from "@opsera/definitions/constants/settings/pipelines/instructions/pipelineInstructionsAttributes.metadata";

export default function useGetPipelineInstructionsAttributesModel() {
  const getPipelineInstructionsAttributesModel = (
    pipelineInstructionsAttributesData,
  ) => {
    return new modelHelpers.parseObjectIntoModel(
      pipelineInstructionsAttributesData,
      pipelineInstructionsAttributesMetadata
    );
  };

  return ({
    getPipelineInstructionsAttributesModel: getPipelineInstructionsAttributesModel,
  });
}
