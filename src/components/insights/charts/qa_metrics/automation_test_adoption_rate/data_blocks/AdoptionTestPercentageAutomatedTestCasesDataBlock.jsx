import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AdoptionTestPercentageAutomatedTestCasesDataBlock({executedTestCount, executedTestsDataPoint}) {
  return (
    <TwoLineScoreDataBlock
      score={executedTestCount}
      dataPoint={executedTestsDataPoint}
      subtitle={"Automated Test Cases Executed"}
    />
  );
}

AdoptionTestPercentageAutomatedTestCasesDataBlock.propTypes = {
  executedTestCount: PropTypes.number,
  executedTestsDataPoint: PropTypes.object,
};

export default AdoptionTestPercentageAutomatedTestCasesDataBlock;
