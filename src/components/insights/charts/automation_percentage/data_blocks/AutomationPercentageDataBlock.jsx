import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";

function AutomationPercentageDataBlock({ score, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLinePercentageDataBlock
          dataPoint={dataPoint}
          percentage={score}
          subtitle={"Automation Percentage"}
        />
      </div>
    </DataBlockBoxContainer>
  );
}
AutomationPercentageDataBlock.propTypes = {
  score: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default AutomationPercentageDataBlock;
