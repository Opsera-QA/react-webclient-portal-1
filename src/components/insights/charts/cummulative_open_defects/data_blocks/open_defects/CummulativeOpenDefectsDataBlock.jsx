import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import NewPercentageDataBlock from "components/common/metrics/percentage/NewPercentageDataBlock";
import { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";

function CummulativeOpenDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <NewPercentageDataBlock
          className={"test-percentage"}
          percentage={defects}
          subtitle={"Cumulative Open Defects"}
          qualityLevel={parseInt(defects) < 10 ? METRIC_QUALITY_LEVELS.SUCCESS : METRIC_QUALITY_LEVELS.DANGER}
          goal={"Goal: Cumulative Open Defects < 10%"}
        />
      </div>
    </DataBlockBoxContainer>
  );
}

CummulativeOpenDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CummulativeOpenDefectsDataBlock;
