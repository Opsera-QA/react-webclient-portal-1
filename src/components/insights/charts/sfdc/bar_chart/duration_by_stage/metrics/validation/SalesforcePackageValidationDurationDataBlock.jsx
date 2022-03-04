import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";

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
            <MetricTextBase formattedText={`${packageValidationDurationMeanInMinutes} min`} className={"metric-block-content-text"}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${packageValidationTotalRunCount} runs`} className={"metric-block-content-text"}/>
          </div>
        </>
      );
    }
    if (hasNumberValue(packageValidationDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${packageValidationDurationMeanInMinutes} min`} className={"metric-block-content-text"}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
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
