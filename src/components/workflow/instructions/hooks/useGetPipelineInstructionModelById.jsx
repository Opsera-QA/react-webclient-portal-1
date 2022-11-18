import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {pipelineInstructionsActions} from "components/workflow/instructions/pipelineInstructions.actions";
import useGetPipelineInstructionsModel from "components/workflow/instructions/hooks/useGetPipelineInstructionsModel";

export default function useGetPipelineInstructionModelById(
  id,
  throwErrorToast = true,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [pipelineInstructionsModel, setPipelineInstructionsModel] = useState(undefined);
  const { getPipelineInstructionsModel } = useGetPipelineInstructionsModel();
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelineInstructionsModel(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setPipelineInstructionsModel(undefined);
      await getPipelineInstructions();
    } catch (error) {
      setError(error);
      if (throwErrorToast === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPipelineInstructions = async () => {
    const response = await pipelineInstructionsActions.getPipelineInstructionsById(
      getAccessToken,
      cancelTokenSource,
      id,
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
