import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AdoptionTestPercentageManualTestCasesDataBlock({manualTestCount,}) {
  return (
    <TwoLineScoreDataBlock
      score={manualTestCount}
      subtitle={"Automated Test Cases Executed Manually"}
    />
  );
}

AdoptionTestPercentageManualTestCasesDataBlock.propTypes = {
  manualTestCount: PropTypes.number,
};

export default AdoptionTestPercentageManualTestCasesDataBlock;
