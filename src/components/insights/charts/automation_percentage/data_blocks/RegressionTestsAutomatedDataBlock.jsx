import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function RegressionTestsAutomated({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Regression Test Cases Automated"} />
      </div>
    </DataBlockBoxContainer>
  );
}

RegressionTestsAutomated.propTypes = {
  defects: PropTypes.number,
};

export default RegressionTestsAutomated;