import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function SalesforceProfileMigrationDurationDataBlock({
  profileMigrationDurationMeanInMinutes,
  profileMigrationTotalRunCount,
}) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };
  console.log(profileMigrationDurationMeanInMinutes, "**2");
  const getProfileMigrationMeanData = () => {
    if (hasNumberValue(profileMigrationDurationMeanInMinutes) && hasNumberValue(profileMigrationTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${profileMigrationDurationMeanInMinutes} min`} />
          </div>
          <div>
            <MetricTextBase formattedText={`${profileMigrationTotalRunCount} runs`} />
          </div>
        </>
      );
    }
    if (hasNumberValue(profileMigrationDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${profileMigrationDurationMeanInMinutes} min`} />;
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Profile Migration"}
      middleText={getProfileMigrationMeanData()}
    />
  );
}

SalesforceProfileMigrationDurationDataBlock.propTypes = {
  profileMigrationDurationMeanInMinutes: PropTypes.number,
  profileMigrationTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SalesforceProfileMigrationDurationDataBlock;
