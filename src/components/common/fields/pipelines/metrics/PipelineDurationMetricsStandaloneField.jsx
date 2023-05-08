import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import InfoText from "components/common/inputs/info_text/InfoText";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useGetPipelineDurationMetrics from "hooks/workflow/pipelines/metrics/useGetPipelineDurationMetrics";

function PipelineDurationMetricsStandaloneField({ pipelineId, pipelineRunCount, className }) {
  const {
    lastFiveRunsDurationText,
    lastRunDurationText,
    isLoading,
    error,
    loadData,
  } = useGetPipelineDurationMetrics(pipelineId, pipelineRunCount);

  useEffect(() => {}, [pipelineId, pipelineRunCount]);

  if (isMongoDbId(pipelineId) !== true || numberHelpers.isNumberGreaterThan(0, pipelineRunCount) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <StandaloneTextFieldBase
        text={lastRunDurationText}
        label={"Last Pipeline Run Duration"}
        className={"py-2"}
        isBusy={isLoading}
        visible={hasStringValue(lastRunDurationText) === true}
      />
      <StandaloneTextFieldBase
        text={lastFiveRunsDurationText}
        label={"Last Five Pipeline Runs Average Duration"}
        className={"py-2"}
        isBusy={isLoading}
        visible={pipelineRunCount >= 5 && hasStringValue(lastFiveRunsDurationText) === true}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

PipelineDurationMetricsStandaloneField.propTypes = {
  pipelineId: PropTypes.string,
  className: PropTypes.string,
  pipelineRunCount: PropTypes.number,
};

export default PipelineDurationMetricsStandaloneField;