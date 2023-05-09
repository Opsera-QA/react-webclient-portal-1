import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import InfoText from "components/common/inputs/info_text/InfoText";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useGetTaskRunMetricsById from "hooks/workflow/tasks/orchestration/metrics/useGetTaskRunMetricsById";

export default function TaskRunDurationMetricsStandaloneField(
  { 
    taskId,
    taskRunCount,
    className,
  }) {
  const {
    lastFiveRunsDurationText,
    lastRunDurationText,
    isLoading,
    error,
    loadData,
  } = useGetTaskRunMetricsById(taskId, taskRunCount);

  useEffect(() => {}, [taskId, taskRunCount]);

  if (isMongoDbId(taskId) !== true || numberHelpers.isNumberGreaterThan(0, taskRunCount) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <StandaloneTextFieldBase
        text={lastRunDurationText}
        label={"Last Task Run Duration"}
        className={"py-2"}
        isBusy={isLoading}
        visible={hasStringValue(lastRunDurationText) === true}
      />
      <StandaloneTextFieldBase
        text={lastFiveRunsDurationText}
        label={"Last Five Task Runs Average Duration"}
        className={"py-2"}
        isBusy={isLoading}
        visible={taskRunCount >= 5 && hasStringValue(lastFiveRunsDurationText) === true}
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
