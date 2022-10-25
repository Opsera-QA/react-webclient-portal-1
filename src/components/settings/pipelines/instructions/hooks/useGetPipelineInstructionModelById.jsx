import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPipelineInstructionsModel
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionsModel";
import { pipelineInstructionsActions } from "components/settings/pipelines/instructions/pipelineInstructions.actions";

export default function useGetPipelineInstructionModelById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineInstructionsModel, setPipelineInstructionsModel] = useState(undefined);
  const { getNewPipelineInstructionsModel } = useGetPipelineInstructionsModel();
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
      await getPipelineInstructions();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
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
      const newModel = getNewPipelineInstructionsModel(
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
    loadData: loadData,
    isLoading: isLoading,
  });
}
