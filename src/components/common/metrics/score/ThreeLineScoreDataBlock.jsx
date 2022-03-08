import React from "react";
import PropTypes from "prop-types";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineBoldBlockBase from "../data_blocks/base/ThreeLineBoldBlockBase";
import ThreeLineDataBlockBase from "../data_blocks/base/ThreeLineDataBlockBase";

function ThreeLineScoreDataBlock(
  {
    score,
    className,
    icon,
    dataPoint,
    bottomText,
    topText
  }) {
  return (
    <ThreeLineBoldBlockBase
      className={className}
      dataPoint={dataPoint}
      topText={topText}
      middleText={
        <MetricScoreText
          dataPoint={dataPoint}
          score={score}
        />
      }
      bottomText={bottomText}
      icon={icon}
    />
  );
}

ThreeLineScoreDataBlock.propTypes = {
  score: PropTypes.number,
  topText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  dataPoint: PropTypes.object,
};

export default ThreeLineScoreDataBlock;