import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
function SalesforceBackupDurationDataBlock({ backupDurationMeanInMinutes, backupTotalRunCount }) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getBackupMeanData = () => {
    if (hasNumberValue(backupDurationMeanInMinutes) && hasNumberValue(backupTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${backupDurationMeanInMinutes} min`} className={"metric-block-content-text"}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${backupTotalRunCount} runs`} className={"metric-block-content-text"}/>
          </div>
        </>
      );
    }
    if (hasNumberValue(backupDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${backupDurationMeanInMinutes} min`} className={"metric-block-content-text"}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Backups"}
      middleText={getBackupMeanData()}
    />
  );
}

SalesforceBackupDurationDataBlock.propTypes = {
  backupDurationMeanInMinutes: PropTypes.number,
  backupTotalRunCount: PropTypes.number,
};

export default SalesforceBackupDurationDataBlock;
