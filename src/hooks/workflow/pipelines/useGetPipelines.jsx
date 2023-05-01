import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetPipelines(
  fields,
  active,
  setUrlParameters = false,
  pageSize,
  handleErrorFunction,
) {
  const [pipelines, setPipelines] = useState([]);
  const [subscribedPipelineIds, setSubscribedPipelineIds] = useState([]);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(new PipelineFilterModel(setUrlParameters));
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const { userData } = useComponentStateReference();
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setPipelines([]);

    if (pageSize) {
      pipelineFilterModel.setData("pageSize", pageSize);
    }

    if (loadData) {
      loadData(getPipelines, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getPipelines = async (newFilterModel = pipelineFilterModel) => {
    setPipelines([]);

    if (PipelineRoleHelper.canGetPipelines(userData) !== true) {
      return;
    }

    const response = await pipelineActions.getPipelines(
      newFilterModel,
      fields,
      active,
    );
    const newPipelines = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setPipelines([...newPipelines]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setSubscribedPipelineIds(DataParsingHelper.parseNestedArray(response, "data.subscriptions", []));
    setPipelineFilterModel({...newFilterModel});
  };

  return ({
    pipelines: pipelines,
    setPipelines: setPipelines,
    pipelineFilterModel: pipelineFilterModel,
    setPipelineFilterModel: setPipelineFilterModel,
    subscribedPipelineIds: subscribedPipelineIds,
    setSubscribedPipelineIds: setSubscribedPipelineIds,
    loadData: async (newFilterModel, fields, active) => loadData(async () => getPipelines(newFilterModel, fields, active), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
