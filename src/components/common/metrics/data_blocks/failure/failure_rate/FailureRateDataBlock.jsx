import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";

function FailureRateDataBlock({ className, failurePercentage, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ThreeLineDataBlockBase
        topText={"Failure Rate"}
        middleText={<MetricPercentageText percentage={failurePercentage} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

FailureRateDataBlock.propTypes = {
  failurePercentage: PropTypes.string,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default FailureRateDataBlock;
