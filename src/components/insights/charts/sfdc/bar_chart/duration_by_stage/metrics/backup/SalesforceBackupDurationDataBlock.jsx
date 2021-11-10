import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";

function SalesforceBackupDurationDataBlock({ meanData, countData }) {
  const getMiddleText = (meanData, countData) => {
    if (meanData && countData) {
      return meanData + " min | " + countData + " runs";
    }
    if (meanData) {
      return meanData + " min | 0";
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Backups"}
      middleText={getMiddleText(meanData, countData)}
    />
  );
}

SalesforceBackupDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforceBackupDurationDataBlock;
