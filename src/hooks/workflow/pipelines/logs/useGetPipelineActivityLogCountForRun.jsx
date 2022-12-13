import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import pipelineActivityLogsActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineActivityLogs.actions";
import {numberHelpers} from "components/common/helpers/number/number.helpers";

export default function useGetPipelineActivityLogCountForRun(
  id,
  runCount,
  handleErrorFunction,
) {
  const [logCount, setLogCount] = useState(0);
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
    setLogCount(0);

    if (isMongoDbId(id) === true && numberHelpers.isNumberGreaterThan(0, runCount) && loadData) {
      loadData(getOrchestrationStatus, handleErrorFunction).catch(() => {});
    }
  }, [id, runCount]);

  const getOrchestrationStatus = async () => {
    if (isMongoDbId(id) !== true || numberHelpers.isNumberGreaterThan(0, runCount) !== true) {
      return;
    }

    const response = await pipelineActivityLogsActions.getPipelineActivityLogCountForRun(
      getAccessToken,
      cancelTokenSource,
      id,
      runCount,
    );

    setLogCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
  };

  return ({
    logCount: logCount,
    isLoading: isLoading,
    loadData: () => loadData(getOrchestrationStatus, handleErrorFunction),
    error: error,
    setError: setError,
  });
}
