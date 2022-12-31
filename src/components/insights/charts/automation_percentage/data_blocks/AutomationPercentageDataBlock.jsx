import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";

function AutomationPercentageDataBlock({ score, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLinePercentageDataBlock
        className="p-2"
        style={{minHeight: '100px'}}
        dataPoint={dataPoint}
        percentage={score}
        subtitle={"Automation Percentage"}
      />
    </DataBlockBoxContainer>
  );
}
AutomationPercentageDataBlock.propTypes = {
  score: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default AutomationPercentageDataBlock;