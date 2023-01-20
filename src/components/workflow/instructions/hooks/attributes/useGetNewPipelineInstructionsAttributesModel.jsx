import { useState } from "react";
import useGetPipelineInstructionsAttributesModel
  from "components/workflow/instructions/hooks/attributes/useGetPipelineInstructionsAttributesModel";

export default function useGetNewPipelineInstructionsAttributesModel() {
  const { getPipelineInstructionsAttributesModel } = useGetPipelineInstructionsAttributesModel();
  const [pipelineInstructionsAttributesModel, setPipelineInstructionsAttributesModel] = useState(getPipelineInstructionsAttributesModel(undefined));

  return ({
    pipelineInstructionsAttributesModel: pipelineInstructionsAttributesModel,
    setPipelineInstructionsAttributesModel: setPipelineInstructionsAttributesModel,
  });
}
