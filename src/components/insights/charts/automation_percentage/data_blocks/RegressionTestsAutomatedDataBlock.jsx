import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function RegressionTestsAutomated({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          subtitle={"Regression Test Cases Automated"} />
    </DataBlockBoxContainer>
  );
}

RegressionTestsAutomated.propTypes = {
  defects: PropTypes.number,
};

export default RegressionTestsAutomated;