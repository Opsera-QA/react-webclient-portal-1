import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import {
  getMiddleText
} from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";
import "components/insights/charts/sdlc/sdlc-duration-by-stage-kpi.css";
function SdlcDurationByStageDataBlockBase({ topText, meanData, countData, goalsData, dataPoint }) {

  return (
    <ThreeLineDataBlockBase
      topText={topText}
      className="sdlc-duration-by-stage-kpi"
      middleText={getMiddleText(meanData, countData, goalsData, dataPoint)}
      dataPoint={dataPoint}
    />
  );
}

SdlcDurationByStageDataBlockBase.propTypes = {
  topText: PropTypes.string,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  dataPoint: PropTypes.object
};

export default SdlcDurationByStageDataBlockBase;
