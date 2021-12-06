import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AutomatedTestAdoptionRateManualTestsDataBlock({manualTestCount, manualTestsDataPoint}) {
  return (
    <TwoLineScoreDataBlock
      score={manualTestCount}
      dataPoint={manualTestsDataPoint}
      subtitle={"Automated Test Cases Executed Manually"}
    />
  );
}

AutomatedTestAdoptionRateManualTestsDataBlock.propTypes = {
  manualTestCount: PropTypes.number,
  manualTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateManualTestsDataBlock;
