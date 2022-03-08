import React from "react";
import PropTypes from "prop-types";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockBase from "../data_blocks/base/ThreeLineDataBlockBase";

function ThreeLineScoreDataBlock(
  {
    score,
    className,
    icon,
    dataPoint,
    bottomText,
    topText,
    iconOverlayBody
  }) {
  return (
    <ThreeLineDataBlockBase
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
      iconOverlayBody={iconOverlayBody}
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
  iconOverlayBody: PropTypes.any,
};

export default ThreeLineScoreDataBlock;