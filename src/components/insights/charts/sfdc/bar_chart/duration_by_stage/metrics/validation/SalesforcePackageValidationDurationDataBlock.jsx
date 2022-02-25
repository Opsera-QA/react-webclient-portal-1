import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function SalesforcePackageValidationDurationDataBlock({
  packageValidationDurationMeanInMinutes,
  packageValidationTotalRunCount,
}) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getPackageValidationMeanData = () => {
    if (hasNumberValue(packageValidationDurationMeanInMinutes) && hasNumberValue(packageValidationTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${packageValidationDurationMeanInMinutes} min`} />
          </div>
          <div>
            <MetricTextBase formattedText={`${packageValidationTotalRunCount} runs`} />
          </div>
        </>
      );
    }
    if (hasNumberValue(packageValidationDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${packageValidationDurationMeanInMinutes} min`} />;
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Package Validation"}
      middleText={getPackageValidationMeanData()}
    />
  );
}

SalesforcePackageValidationDurationDataBlock.propTypes = {
  packageValidationDurationMeanInMinutes: PropTypes.number,
  packageValidationTotalRunCount: PropTypes.number,
};

export default SalesforcePackageValidationDurationDataBlock;
