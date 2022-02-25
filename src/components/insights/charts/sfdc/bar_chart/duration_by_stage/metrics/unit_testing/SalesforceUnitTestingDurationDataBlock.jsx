import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function SalesforceUnitTestingDurationDataBlock({ unitTestingDurationMeanInMinutes, unitTestingTotalRunCount }) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getUnitTestingMeanData = () => {
    if (hasNumberValue(unitTestingDurationMeanInMinutes) && hasNumberValue(unitTestingTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${unitTestingDurationMeanInMinutes} min`} />
          </div>
          <div>
            <MetricTextBase formattedText={`${unitTestingTotalRunCount} runs`} />
          </div>
        </>
      );
    }
    if (hasNumberValue(unitTestingDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${unitTestingDurationMeanInMinutes} min`} />;
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Unit Testing"}
      middleText={getUnitTestingMeanData()}
    />
  );
}

SalesforceUnitTestingDurationDataBlock.propTypes = {
  unitTestingDurationMeanInMinutes: PropTypes.number,
  unitTestingTotalRunCount: PropTypes.number,
};

export default SalesforceUnitTestingDurationDataBlock;
