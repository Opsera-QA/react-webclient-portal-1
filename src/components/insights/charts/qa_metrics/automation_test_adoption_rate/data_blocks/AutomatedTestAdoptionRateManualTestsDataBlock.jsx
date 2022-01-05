import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function AutomatedTestAdoptionRateManualTestsDataBlock({manualTestCount, manualTestsDataPoint}) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={manualTestCount} dataPoint={manualTestsDataPoint} subtitle={"Automated Test Cases Executed Manually"} />
      </div>
    </DataBlockBoxContainer>
  );
}

AutomatedTestAdoptionRateManualTestsDataBlock.propTypes = {
  manualTestCount: PropTypes.number,
  manualTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateManualTestsDataBlock;
