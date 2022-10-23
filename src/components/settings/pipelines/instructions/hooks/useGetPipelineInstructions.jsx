import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsFilterModel
  from "components/settings/pipelines/instructions/pipelineInstructions.filter.model";
import pipelineInstructionsActions from "components/settings/pipelines/instructions/pipelineInstructions.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetPipelineInstructions() {
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineInstructions, setPipelineInstructions] = useState(undefined);
  const [pipelineInstructionsFilterModel, setPipelineInstructionsFilterModel] = useState(new PipelineInstructionsFilterModel());
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelineInstructions(undefined);
    loadData().catch(() => {});
  }, []);

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
    const response = await pipelineInstructionsActions.getPipelineInstructions(
      getAccessToken,
      cancelTokenSource,
      pipelineInstructionsFilterModel?.getFilterValue("search"),
      pipelineInstructionsFilterModel?.getFilterValue("type"),
    );

    const pipelineInstructionList = DataParsingHelper.parseArray(response?.data?.data, []);

    if (pipelineInstructions) {
      setPipelineInstructions([...pipelineInstructionList]);
    }
  };

  return ({
    pipelineInstructions: pipelineInstructions,
    setPipelineInstructions: setPipelineInstructions,
    pipelineInstructionsFilterModel: pipelineInstructionsFilterModel,
    setPipelineInstructionsFilterModel: setPipelineInstructionsFilterModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
