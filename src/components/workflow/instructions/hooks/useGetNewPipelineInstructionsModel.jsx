import useGetScriptModel from "components/inventory/scripts/hooks/useGetScriptModel";
import { useState } from "react";
import useGetPipelineInstructionsModel
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionsModel";

export default function useGetNewPipelineInstructionsModel() {
  const { getNewPipelineInstructionsModel } = useGetPipelineInstructionsModel();
  const [pipelineInstructionsModel, setPipelineInstructionsModel] = useState(getNewPipelineInstructionsModel(undefined, true));

  return ({
    pipelineInstructionsModel: pipelineInstructionsModel,
    setPipelineInstructionsModel: setPipelineInstructionsModel,
  });
}
