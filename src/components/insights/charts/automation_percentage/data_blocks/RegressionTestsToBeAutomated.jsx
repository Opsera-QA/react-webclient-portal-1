import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function RegressionTestsToBeAutomated({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Regression Test Cases To Be Automated"} />
      </div>
    </DataBlockBoxContainer>
  );
}

RegressionTestsToBeAutomated.propTypes = {
  defects: PropTypes.number,
};

export default RegressionTestsToBeAutomated;