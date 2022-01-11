import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function AutomatedTestAdoptionRateManualTestsDataBlock({manualTestCount, manualTestsDataPoint}) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className="p-3"
        score={manualTestCount}
        subtitle={"Automated Test Cases Executed Manually"}
        dataPoint={manualTestsDataPoint}
      />
    </DataBlockBoxContainer>
  );
}

AutomatedTestAdoptionRateManualTestsDataBlock.propTypes = {
  manualTestCount: PropTypes.number,
  manualTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateManualTestsDataBlock;
