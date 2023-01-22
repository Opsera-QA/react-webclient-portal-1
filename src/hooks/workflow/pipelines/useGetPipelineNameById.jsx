import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

export default function useGetPipelineNameById(
  pipelineId,
  handleErrorFunction,
) {
  const [pipeline, setPipeline] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setPipeline(undefined);

    if (isMongoDbId(pipelineId) === true && loadData) {
      loadData(getPipeline, handleErrorFunction).catch(() => {});
    }
  }, [pipelineId]);

  const getPipeline = async () => {
    if (isMongoDbId(pipelineId) !== true) {
      return;
    }

    const response = await pipelineActions.getPipelineNameById( pipelineId);
    setPipeline(DataParsingHelper.parseObject(response?.data?.data));
  };

  return ({
    pipeline: pipeline,
    setPipeline: setPipeline,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
