import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePipelineActivityLogActions from "hooks/workflow/pipelines/logs/usePipelineActivityLogActions";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";

export default function useGetPipelineDurationMetrics(
  pipelineId,
  pipelineRunCount,
  handleErrorFunction,
) {
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const [lastRunDurationText, setLastRunDurationText] = useState("");
  const [lastFiveRunsDurationText, setLastFiveRunsDurationText] = useState("");
  const pipelineActivityLogActions = usePipelineActivityLogActions();

  useEffect(() => {
    setLastRunDurationText("");
    setLastFiveRunsDurationText("");

    if (loadData && isMongoDbId(pipelineId) && numberHelpers.isNumberGreaterThan(0, pipelineRunCount) === true) {
      loadData(getPipelineDurationMetrics, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getPipelineDurationMetrics = async () => {
    const response = await pipelineActivityLogActions.getPipelineDurationMetrics(pipelineId);
    const lastRunDurationMs = DataParsingHelper.parseNestedInteger(response, "data.data.lastRunDurationInMs");
    const lastFiveRunsDurationAverageInMs = DataParsingHelper.parseNestedInteger(response, "data.data.lastFiveRunsDurationAverageInMs");
    // const totalAverageInMs = DataParsingHelper.parseNestedInteger(response, "data.data.totalAverageInMs");

    setLastRunDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastRunDurationMs), ""));
    setLastFiveRunsDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastFiveRunsDurationAverageInMs), ""));
  };

  return ({
    lastRunDurationText: lastRunDurationText,
    lastFiveRunsDurationText: lastFiveRunsDurationText,
    loadData: async () => loadData(async () => getPipelineDurationMetrics(), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
