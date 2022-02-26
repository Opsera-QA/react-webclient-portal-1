import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockFormattedBase from "../data_blocks/base/ThreeLineDataBlockFormattedBase";
import MetricNumberFormattedText from "./MetricNumberFormattedText";

function ThreeLineNumberDataBlock({
  numberData,
  supportingText,
  dataPoint,
  middleText,
  bottomText,
  className }) {
    return (
      <ThreeLineDataBlockFormattedBase
        className={className}
        dataPoint={dataPoint}
        topText={
          <MetricNumberFormattedText
            dataPoint={dataPoint}
            numberData={numberData}
            supportingText={supportingText}
          />
        }
        middleText={middleText}
        bottomText={bottomText}
      />
    );
  }

ThreeLineNumberDataBlock.propTypes = {
  numberData: PropTypes.number,
  supportingText: PropTypes.string,
  dataPoint: PropTypes.object,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  middleText: PropTypes.string,
  bottomText: PropTypes.string
};

export default ThreeLineNumberDataBlock;