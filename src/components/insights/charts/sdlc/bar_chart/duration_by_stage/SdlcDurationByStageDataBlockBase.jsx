import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import {
  getMiddleText,
  getMiddleStyle,
  isEmptyCustom,
} from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";

function SdlcDurationByStageDataBlockBase({ topText, meanData, countData, goalsData }) {
  return (
    <div
      className="metric-box"
      style={{ minHeight: "120px", verticalAlign: "middle", display: "flex", borderWidth: "2px" }}
    >
      <div style={{ margin: "auto" }}>
        <ThreeLineDataBlockNoFocusBase
          topText={topText}
          middleText={getMiddleText(meanData, countData)}
          bottomText={!isEmptyCustom(goalsData) ? `Goal: ${goalsData} min` : ""}
          middleStyle={getMiddleStyle(meanData, goalsData)}
        />
      </div>
    </div>
  );
}

SdlcDurationByStageDataBlockBase.propTypes = {
  topText: PropTypes.string,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SdlcDurationByStageDataBlockBase;
