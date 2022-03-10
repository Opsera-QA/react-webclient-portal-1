import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function RegressionTestsAutomated({ defects, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          dataPoint={dataPoint}
          subtitle={"Regression Test Cases Automated"} />
    </DataBlockBoxContainer>
  );
}

RegressionTestsAutomated.propTypes = {
  defects: PropTypes.number,
  dataPoint: PropTypes.object
};

export default RegressionTestsAutomated;