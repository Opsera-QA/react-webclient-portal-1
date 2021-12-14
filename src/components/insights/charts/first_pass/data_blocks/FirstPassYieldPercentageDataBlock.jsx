import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import NewPercentageDataBlock from "components/common/metrics/percentage/NewPercentageDataBlock";
import { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";

function FirstPassYieldPercentageDataBlock({ score, subtitle }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <NewPercentageDataBlock
          className={"test-percentage"}
          percentage={score}
          subtitle={subtitle}
          qualityLevel={score < 70 ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS}
          goal={"Goal: Adoption Percentage > 70%"}
        />
      </div>
    </DataBlockBoxContainer>
  );
}
FirstPassYieldPercentageDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
};

export default FirstPassYieldPercentageDataBlock;
