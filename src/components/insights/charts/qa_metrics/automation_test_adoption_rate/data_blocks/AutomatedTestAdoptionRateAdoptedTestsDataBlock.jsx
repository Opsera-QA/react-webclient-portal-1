import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AutomatedTestAdoptionRateAdoptedTestsDataBlock({executedTestCount, executedTestsDataPoint}) {
  return (
    <TwoLineScoreDataBlock
      score={executedTestCount}
      dataPoint={executedTestsDataPoint}
      subtitle={"Automated Test Cases Executed1"}
    />
  );
}

AutomatedTestAdoptionRateAdoptedTestsDataBlock.propTypes = {
  executedTestCount: PropTypes.number,
  executedTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateAdoptedTestsDataBlock;
