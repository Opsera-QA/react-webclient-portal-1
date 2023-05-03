import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useTaskActions from "hooks/workflow/tasks/useTaskActions";

export default function useGetTaskRunMetricsById(
  id,
  handleErrorFunction,
) {
  const [taskRunDurationMetrics, setTaskRunDurationMetrics] = useState({});
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const taskActions = useTaskActions();

  useEffect(() => {
    setTaskRunDurationMetrics({});

    if (isMongoDbId(id) === true && loadData) {
      loadData(getOrchestrationStatus, handleErrorFunction).catch(() => {});
    }
  }, [id]);

  const getOrchestrationStatus = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await taskActions.getTaskRunDurationMetrics(id,);
    console.log("response: " + JSON.stringify(response));
    const runDurationMetrics = DataParsingHelper.parseNestedObject(response, "data.data", {});

    if (ObjectHelper.areObjectsEqualLodash(taskRunDurationMetrics, runDurationMetrics) !== true) {
      setTaskRunDurationMetrics({...runDurationMetrics});
    }
  };

  return ({
    lastRunDurationInMs: taskRunDurationMetrics?.lastRunDurationInMs,
    totalAverageDurationInMs: taskRunDurationMetrics?.totalAverageDurationInMs,
    lastFiveRunsDurationAverageInMs: taskRunDurationMetrics?.lastFiveRunsDurationAverageInMs,
    loadData: () => loadData(getOrchestrationStatus, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
