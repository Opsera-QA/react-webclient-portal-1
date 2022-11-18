import { useState } from "react";
import useGetPipelineInstructionsModel from "components/workflow/instructions/hooks/useGetPipelineInstructionsModel";

export default function useGetNewPipelineInstructionsModel() {
  const { getPipelineInstructionsModel } = useGetPipelineInstructionsModel();
  const [pipelineInstructionsModel, setPipelineInstructionsModel] = useState(getPipelineInstructionsModel(undefined, true));

  return ({
    pipelineInstructionsModel: pipelineInstructionsModel,
    setPipelineInstructionsModel: setPipelineInstructionsModel,
  });
}
