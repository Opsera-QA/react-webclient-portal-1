import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
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
            <MetricTextBase formattedText={`${backupDurationMeanInMinutes} min`} />
          </div>
          <div>
            <MetricTextBase formattedText={`${backupTotalRunCount} runs`} />
          </div>
        </>
      );
    }
    if (hasNumberValue(backupDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${backupDurationMeanInMinutes} min`} />;
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
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
