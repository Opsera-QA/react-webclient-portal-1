import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useTaskActions from "hooks/workflow/tasks/useTaskActions";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";

export default function useGetTaskRunMetricsById(
  id,
  taskRunCount,
  handleErrorFunction,
) {
  const [lastRunDurationText, setLastRunDurationText] = useState("");
  const [lastFiveRunsDurationText, setLastFiveRunsDurationText] = useState("");
  const [totalAverageDurationText, setTotalAverageDurationText] = useState("");
  const [lastRunDuration, setLastRunDuration] = useState(undefined);
  const [lastFiveRunsDurationAverage, setLastFiveRunsDurationAverage] = useState(undefined);
  const [totalAverageDuration, setTotalAverageDuration] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const taskActions = useTaskActions();

  useEffect(() => {
    setLastRunDurationText("");
    setLastFiveRunsDurationText("");
    setTotalAverageDurationText("");

    if (isMongoDbId(id) === true && loadData) {
      loadData(getTaskRunMetricsById, handleErrorFunction).catch(() => {});
    }
  }, [id, taskRunCount]);

  const getTaskRunMetricsById = async () => {
    if (isMongoDbId(id) !== true) {
      return;
    }

    const response = await taskActions.getTaskRunDurationMetrics(id,);
    const lastRunDurationMs = DataParsingHelper.parseNestedInteger(response, "data.data.lastRunDurationInMs");
    const lastFiveRunsDurationAverageInMs = DataParsingHelper.parseNestedInteger(response, "data.data.lastFiveRunsDurationAverageInMs");
    const totalAverageInMs = DataParsingHelper.parseNestedInteger(response, "data.data.totalAverageInMs");
    setLastRunDuration(lastRunDurationMs);
    setLastFiveRunsDurationAverage(lastFiveRunsDurationAverageInMs);
    setTotalAverageDuration(totalAverageInMs);
    setLastRunDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastRunDurationMs), ""));
    setLastFiveRunsDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastFiveRunsDurationAverageInMs), ""));
    setTotalAverageDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(totalAverageInMs), ""));
  };

  return ({
    lastRunDurationText: lastRunDurationText,
    lastFiveRunsDurationText: lastFiveRunsDurationText,
    totalAverageDurationText: totalAverageDurationText,
    lastRunDuration: lastRunDuration,
    lastFiveRunsDurationAverage: lastFiveRunsDurationAverage,
    totalAverageDuration: totalAverageDuration,
    loadData: () => loadData(getTaskRunMetricsById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
