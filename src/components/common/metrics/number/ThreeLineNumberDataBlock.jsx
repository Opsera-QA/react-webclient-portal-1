import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockFormattedBase from "../data_blocks/base/ThreeLineDataBlockFormattedBase";
import MetricNumberFormattedText from "./MetricNumberFormattedText";

function ThreeLineNumberDataBlock({
  numberData,
  supportingText,
  icon,
  topText,
  iconOverlayBody,
  dataPoint,
  bottomText,
  className }) {
    return (
      <ThreeLineDataBlockFormattedBase
        className={className}
        dataPoint={dataPoint}
        topText={topText}
        middleText={
          <MetricNumberFormattedText
          dataPoint={dataPoint}
          numberData={numberData}
          supportingText={supportingText}
          className={"metric-block-content-text"}
          />
        }
        bottomText={bottomText}
        icon={icon}
        iconOverlayBody={iconOverlayBody}
      />
    );
  }

ThreeLineNumberDataBlock.propTypes = {
  numberData: PropTypes.number,
  supportingText: PropTypes.string,
  dataPoint: PropTypes.object,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  bottomText: PropTypes.string,
  topText: PropTypes.any,
  icon: PropTypes.object,
  iconOverlayBody: PropTypes.any,
};

export default ThreeLineNumberDataBlock;