import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import ContainedThreeLineDataBlockBase
  from "components/common/metrics/data_blocks/base/ContainedThreeLineDataBlockBase";

function SuccessRateContainedDataBlock({ className, successPercentage, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ContainedThreeLineDataBlockBase
        titleText={"Success Rate"}
        middleText={<MetricPercentageText percentage={successPercentage} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

SuccessRateContainedDataBlock.propTypes = {
  successPercentage: PropTypes.string,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default SuccessRateContainedDataBlock;
