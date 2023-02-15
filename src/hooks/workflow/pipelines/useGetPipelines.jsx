import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";

export default function useGetPipelines(
  handleErrorFunction,
) {
  const [pipelines, setPipelines] = useState([]);
  const [pipelineFilterModel, setPipelineFilterModel] = useState(new PipelineFilterModel());
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setPipelines(undefined);

    if (loadData) {
      loadData(getPipelines, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getPipelines = async (
    newFilterModel = pipelineFilterModel,
    fields,
    active,
  ) => {
    const response = await pipelineActions.getPipelines(
      newFilterModel,
      fields,
      active,
    );
    const newPipeline = DataParsingHelper.parseObject(response?.data?.data);

    if (newPipeline) {
      setPipelines(newPipeline);
    }
  };

  return ({
    pipelines: pipelines,
    setPipelines: setPipelines,
    pipelineFilterModel: pipelineFilterModel,
    setPipelineFilterModel: setPipelineFilterModel,
    loadData: async (newFilterModel, fields, active) => loadData(async () => getPipelines(newFilterModel, fields, active), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
