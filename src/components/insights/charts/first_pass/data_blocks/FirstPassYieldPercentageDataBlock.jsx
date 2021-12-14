import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
function FirstPassYieldPercentageDataBlock({ score, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLinePercentageDataBlock dataPoint={dataPoint} percentage={score} subtitle={"First Pass Yield"} />
      </div>
    </DataBlockBoxContainer>
  );
}
FirstPassYieldPercentageDataBlock.propTypes = {
  score: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default FirstPassYieldPercentageDataBlock;
