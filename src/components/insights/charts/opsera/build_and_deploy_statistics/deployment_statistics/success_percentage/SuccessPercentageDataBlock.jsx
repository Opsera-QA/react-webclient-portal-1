import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";

function SuccessPercentageDataBlock({ className, successPercentage, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ThreeLineDataBlockBase
        className={"p-2"}
        topText={"Success Percentage"}
        middleText={<MetricPercentageText percentage={successPercentage} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

SuccessPercentageDataBlock.propTypes = {
  successPercentage: PropTypes.string,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default SuccessPercentageDataBlock;
