import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {pipelineInstructionsActions} from "components/workflow/instructions/pipelineInstructions.actions";
import useGetPipelineInstructionsModel from "components/workflow/instructions/hooks/useGetPipelineInstructionsModel";

export default function useGetPipelineInstructionModelByPipelineStep(
  pipelineId,
  pipelineStepId,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [pipelineInstructionsModel, setPipelineInstructionsModel] = useState(undefined);
  const { getPipelineInstructionsModel } = useGetPipelineInstructionsModel();
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelineInstructionsModel(undefined);

    if (isMongoDbId(pipelineId) === true && isMongoDbId(pipelineStepId) === true) {
      loadData().catch(() => {
      });
    }
  }, [pipelineId, pipelineStepId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setPipelineInstructionsModel(undefined);
      await getPipelineInstructions();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPipelineInstructions = async () => {
    const response = await pipelineInstructionsActions.getPipelineInstructionsByPipelineStep(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineStepId,
    );

    const pipelineInstructions = response?.data?.data;

    if (pipelineInstructions) {
      const newModel = getPipelineInstructionsModel(
        pipelineInstructions,
        false,
        setPipelineInstructionsModel,
        loadData,
      );
      setPipelineInstructionsModel({ ...newModel });
    }
  };

  return ({
    pipelineInstructionsModel: pipelineInstructionsModel,
    setPipelineInstructionsModel: setPipelineInstructionsModel,
    error: error,
    setError: setError,
    loadData: loadData,
    isLoading: isLoading,
  });
}
