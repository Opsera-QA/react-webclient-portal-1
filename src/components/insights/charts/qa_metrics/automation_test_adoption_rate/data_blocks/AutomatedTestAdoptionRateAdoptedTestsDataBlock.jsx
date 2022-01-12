import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function AutomatedTestAdoptionRateAdoptedTestsDataBlock({ executedTestsDataPoint, executedTestCount}) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={executedTestCount}
          dataPoint={executedTestsDataPoint}
          subtitle={"Automated Test Cases Executed"} />
    </DataBlockBoxContainer>
  );
}

AutomatedTestAdoptionRateAdoptedTestsDataBlock.propTypes = {
  executedTestCount: PropTypes.number,
  executedTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateAdoptedTestsDataBlock;