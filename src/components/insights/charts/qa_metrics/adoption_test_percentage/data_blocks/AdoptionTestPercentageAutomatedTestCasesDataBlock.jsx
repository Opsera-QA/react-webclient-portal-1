import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AdoptionTestPercentageAutomatedTestCasesDataBlock({executedTestCount,}) {
  return (
    <TwoLineScoreDataBlock
      score={executedTestCount}
      subtitle={"Automated Test Cases Executed"}
    />
  );
}

AdoptionTestPercentageAutomatedTestCasesDataBlock.propTypes = {
  executedTestCount: PropTypes.number,
};

export default AdoptionTestPercentageAutomatedTestCasesDataBlock;
