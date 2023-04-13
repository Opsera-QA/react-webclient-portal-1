import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import pipelineActions from "components/workflow/pipeline-actions";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

export default function useGetPipelineById(
  id,
  handleErrorFunction,
) {
  const [pipeline, setPipeline] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPipeline(undefined);

    if (isMongoDbId(id) === true && loadData) {
      loadData(getPipeline, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getPipeline = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await pipelineActions.getPipelineByIdV2(getAccessToken, cancelTokenSource, id);
    const newPipeline = DataParsingHelper.parseObject(response?.data?.data);

    if (ObjectHelper.areObjectsEqualLodash(newPipeline, pipeline) !== true) {
      setPipeline({...newPipeline});
    }
  };

  return ({
    pipeline: pipeline,
    setPipeline: setPipeline,
    loadData: async () => await loadData(getPipeline, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
