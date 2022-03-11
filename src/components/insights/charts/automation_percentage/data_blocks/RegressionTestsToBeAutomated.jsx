import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function RegressionTestsToBeAutomated({ defects, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className="p-2"
          style={{minHeight: '100px'}}
          score={defects}
          dataPoint={dataPoint}
          subtitle={"Regression Test Cases To Be Automated"} />
    </DataBlockBoxContainer>
  );
}

RegressionTestsToBeAutomated.propTypes = {
  defects: PropTypes.number,
  dataPoint: PropTypes.object
};

export default RegressionTestsToBeAutomated;