import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import {
  getMiddleText
} from "../github_actions-utility";
import "components/insights/charts/github_actions/lead-time-release-duration-kpi.css";
function LeadTimeAndReleaseDurationDataBlockBase({ topText, meanData, countData, goalsData, dataPoint }) {

  return (
    <ThreeLineDataBlockBase
      topText={topText}
      className="lead-time-release-duration-kpi"
      middleText={getMiddleText(meanData, countData, goalsData, dataPoint)}
      dataPoint={dataPoint}
    />
  );
}

LeadTimeAndReleaseDurationDataBlockBase.propTypes = {
  topText: PropTypes.string,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  dataPoint: PropTypes.any
};

export default LeadTimeAndReleaseDurationDataBlockBase;
