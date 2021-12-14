import React from "react";
import PropTypes from "prop-types";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ContainedThreeLineDataBlockBase
  from "components/common/metrics/data_blocks/base/ContainedThreeLineDataBlockBase";

function AverageDailyBuildsContainedDataBlock({ className, averageDailyCount, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ContainedThreeLineDataBlockBase
        titleText={"Average Daily Builds"}
        middleText={<MetricScoreText score={averageDailyCount} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

AverageDailyBuildsContainedDataBlock.propTypes = {
  averageDailyCount: PropTypes.number,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default AverageDailyBuildsContainedDataBlock;
