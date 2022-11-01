import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsFilterModel
  from "components/settings/pipelines/instructions/pipelineInstructions.filter.model";
import { pipelineInstructionsActions } from "components/settings/pipelines/instructions/pipelineInstructions.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useGetPipelineInstructions() {
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineInstructions, setPipelineInstructions] = useState([]);
  const [pipelineInstructionsFilterModel, setPipelineInstructionsFilterModel] = useState(new PipelineInstructionsFilterModel());
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setPipelineInstructions([]);
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

    if (pipelineInstructionList) {
      setPipelineInstructions([...pipelineInstructionList]);
      newFilterModel.setData("totalCount", DataParsingHelper.parseInteger(response?.data?.count, 0));
      newFilterModel.setData("activeFilters", newFilterModel?.getActiveFilters());
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
