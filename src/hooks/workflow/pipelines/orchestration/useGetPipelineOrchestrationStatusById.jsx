import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {pipelineOrchestrationActions} from "components/workflow/orchestration/pipelineOrchestration.actions";

export default function useGetPipelineOrchestrationStatusById(
  id,
  handleErrorFunction,
) {
  const [orchestrationStatus, setOrchestrationStatus] = useState({});
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setOrchestrationStatus({});

    if (isMongoDbId(id) === true && loadData) {
      loadData(getOrchestrationStatus, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getOrchestrationStatus = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await pipelineOrchestrationActions.getPipelineOrchestrationStatus(
      getAccessToken,
      cancelTokenSource,
      id,
    );
    setOrchestrationStatus(DataParsingHelper.parseObject(response?.data?.data, {}));
  };

  return ({
    status: orchestrationStatus.status,
    isQueued: orchestrationStatus.isQueued,
    loadData: () => loadData(getOrchestrationStatus, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
