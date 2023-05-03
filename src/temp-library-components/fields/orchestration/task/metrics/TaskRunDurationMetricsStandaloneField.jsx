import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import InfoText from "components/common/inputs/info_text/InfoText";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";
import useGetTaskRunMetricsById from "hooks/workflow/tasks/orchestration/metrics/useGetTaskRunMetricsById";

export default function TaskRunDurationMetricsStandaloneField(
  { 
    taskId,
    taskRunCount,
    className,
  }) {
  const [lastRunDurationText, setLastRunDurationText] = useState("");
  const [lastFiveRunsDurationText, setLastFiveRunsDurationText] = useState("");
  const {
    isLoading,
    error,
    lastFiveRunsDurationAverageInMs,
    lastRunDurationInMs,
  } = useGetTaskRunMetricsById(taskId);

  useEffect(() => {
    setLastRunDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastRunDurationInMs), ""));
    setLastFiveRunsDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastFiveRunsDurationAverageInMs), ""));
  }, [taskId, lastRunDurationInMs, lastFiveRunsDurationAverageInMs]);

  const getLastRunDurationText = () => {
    if (hasStringValue(lastRunDurationText) === true) {
      return lastRunDurationText;
    }

    return isLoading ? "" : "No Valid Metrics to Display";
  };

  const getLastFiveRunsDurationText = () => {
    if (hasStringValue(lastFiveRunsDurationText) === true) {
      return lastFiveRunsDurationText;
    }

    return isLoading ? "" : "No Valid Metrics to Display";
  };


  if (isMongoDbId(taskId) !== true || numberHelpers.isNumberGreaterThan(0, taskRunCount) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <StandaloneTextFieldBase
        text={getLastRunDurationText()}
        label={"Last Task Run Duration"}
        className={"py-2"}
        isBusy={isLoading}
      />
      <StandaloneTextFieldBase
        text={getLastFiveRunsDurationText()}
        label={"Last Five Task Runs Average Duration"}
        className={"py-2"}
        isBusy={isLoading}
        visible={taskRunCount >= 5}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

TaskRunDurationMetricsStandaloneField.propTypes = {
  taskId: PropTypes.string,
  className: PropTypes.string,
  taskRunCount: PropTypes.number,
};
