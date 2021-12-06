import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AdoptionTestPercentageManualTestCasesDataBlock({manualTestCount, manualTestsDataPoint}) {
  return (
    <TwoLineScoreDataBlock
      score={manualTestCount}
      dataPoint={manualTestsDataPoint}
      subtitle={"Automated Test Cases Executed Manually"}
    />
  );
}

AdoptionTestPercentageManualTestCasesDataBlock.propTypes = {
  manualTestCount: PropTypes.number,
  manualTestsDataPoint: PropTypes.object,
};

export default AdoptionTestPercentageManualTestCasesDataBlock;
