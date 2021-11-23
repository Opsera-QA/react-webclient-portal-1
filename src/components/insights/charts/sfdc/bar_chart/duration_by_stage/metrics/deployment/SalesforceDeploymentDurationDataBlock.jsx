import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import { statusColors } from "components/insights/charts/charts-views";
import "../../salesforce-duration-by-stage-kpi.css";
import { getMiddleText, getMiddleStyle } from "../../salesforce-duration-by-stage-utility";

function SalesforceDeploymentDurationDataBlock({ meanData, countData, goalsData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Deployment"}
      middleText={getMiddleText(meanData, countData)}
      bottomText={goalsData ? "Goal: " + goalsData + " min" : "No Goal"}
      middleStyle={getMiddleStyle(meanData, goalsData)}
    />
  );
}

SalesforceDeploymentDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SalesforceDeploymentDurationDataBlock;
