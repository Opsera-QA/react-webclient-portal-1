import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function SeleniumTestsCasesPassedDataBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
      <TwoLineDataBlockBase title={score} subtitle={"Test Cases Passed"} />
      </div>
    </DataBlockBoxContainer>
  );
}
SeleniumTestsCasesPassedDataBlock.propTypes = {
  score: PropTypes.string
};

export default SeleniumTestsCasesPassedDataBlock;
