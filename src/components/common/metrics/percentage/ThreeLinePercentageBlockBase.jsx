import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../data_blocks/base/ThreeLineDataBlockBase";
import MetricPercentageText from "./MetricPercentageText";

function ThreeLinePercentageBlockBase(
  {
    percentage,
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
        <MetricPercentageText
          dataPoint={dataPoint}
          percentage={percentage}
          className={"metric-block-content-text"}
        />
      }
      bottomText={bottomText}
      icon={icon}
      iconOverlayBody={iconOverlayBody}
    />
  );
}

ThreeLinePercentageBlockBase.propTypes = {
  percentage: PropTypes.number,
  topText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  dataPoint: PropTypes.object,
  iconOverlayBody: PropTypes.any,
};

export default ThreeLinePercentageBlockBase;