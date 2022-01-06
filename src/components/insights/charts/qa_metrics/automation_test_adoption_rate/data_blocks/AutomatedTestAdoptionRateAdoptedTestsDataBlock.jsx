import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function AutomatedTestAdoptionRateAdoptedTestsDataBlock({ executedTestsDataPoint, executedTestCount}) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={executedTestCount} dataPoint={executedTestsDataPoint} subtitle={"Automated Test Cases Executed"} />
      </div>
    </DataBlockBoxContainer>
  );
}

AutomatedTestAdoptionRateAdoptedTestsDataBlock.propTypes = {
  executedTestCount: PropTypes.number,
  executedTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateAdoptedTestsDataBlock;
