import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsFilterModel
  from "components/settings/pipelines/instructions/pipelineInstructions.filter.model";
import { pipelineInstructionsActions } from "components/settings/pipelines/instructions/pipelineInstructions.actions";
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

  const loadData = async (newFilterModel = pipelineInstructionsFilterModel) => {
    try {
      setIsLoading(true);
      await getPipelineInstructions(newFilterModel);
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPipelineInstructions = async (newFilterModel = pipelineInstructionsFilterModel) => {
    const response = await pipelineInstructionsActions.getPipelineInstructions(
      getAccessToken,
      cancelTokenSource,
      newFilterModel?.getFilterValue("search"),
      newFilterModel?.getFilterValue("type"),
    );

    const pipelineInstructionList = DataParsingHelper.parseArray(response?.data?.data, []);

    if (pipelineInstructions) {
      setPipelineInstructions([...pipelineInstructionList]);
      newFilterModel.setData("totalCount", response.data.count);
      newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
      setPipelineInstructionsFilterModel({...newFilterModel});
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
