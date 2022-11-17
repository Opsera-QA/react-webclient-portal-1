import { useState } from "react";
import useGetPipelineInstructionsModel from "components/workflow/instructions/hooks/useGetPipelineInstructionsModel";

export default function useGetNewPipelineInstructionsModel() {
  const { getNewPipelineInstructionsModel } = useGetPipelineInstructionsModel();
  const [pipelineInstructionsModel, setPipelineInstructionsModel] = useState(getNewPipelineInstructionsModel(undefined, true));

  return ({
    pipelineInstructionsModel: pipelineInstructionsModel,
    setPipelineInstructionsModel: setPipelineInstructionsModel,
  });
}
