import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";

export default function useGetTaskActivityLogCountForRun(
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
      loadData(getLogCount, handleErrorFunction).catch(() => {});
    }
  }, [id, runCount]);

  const getLogCount = async () => {
    if (isMongoDbId(id) !== true || numberHelpers.isNumberGreaterThan(0, runCount) !== true) {
      return;
    }

    const response = await taskActivityLogActions.getTaskActivityLogCountForTaskRun(
      getAccessToken,
      cancelTokenSource,
      id,
      runCount,
    );
    console.log("taskRunCount: " + JSON.stringify(response?.data?.count));

    setLogCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
  };

  return ({
    logCount: logCount,
    isLoading: isLoading,
    loadData: () => loadData(getLogCount, handleErrorFunction),
    error: error,
    setError: setError,
  });
}
