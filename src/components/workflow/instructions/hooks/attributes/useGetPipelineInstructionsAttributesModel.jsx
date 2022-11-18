import modelHelpers from "components/common/model/modelHelpers";
import pipelineInstructionsAttributesMetadata
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructionsAttributes.metadata";

export default function useGetPipelineInstructionsAttributesModel() {
  const getPipelineInstructionsAttributesModel = (
    pipelineInstructionsAttributesData,
  ) => {
    return modelHelpers.parseObjectIntoModel(
      pipelineInstructionsAttributesData,
      pipelineInstructionsAttributesMetadata
    );
  };

  return ({
    getPipelineInstructionsAttributesModel: getPipelineInstructionsAttributesModel,
  });
}
