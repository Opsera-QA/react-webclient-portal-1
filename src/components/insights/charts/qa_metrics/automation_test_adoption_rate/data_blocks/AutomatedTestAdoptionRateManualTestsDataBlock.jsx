import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function AutomatedTestAdoptionRateManualTestsDataBlock({manualTestCount, manualTestsDataPoint}) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={manualTestCount}
          dataPoint={manualTestsDataPoint}
          subtitle={"Automated Test Cases Executed Manually"} />
    </DataBlockBoxContainer>
  );
}

AutomatedTestAdoptionRateManualTestsDataBlock.propTypes = {
  manualTestCount: PropTypes.number,
  manualTestsDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateManualTestsDataBlock;