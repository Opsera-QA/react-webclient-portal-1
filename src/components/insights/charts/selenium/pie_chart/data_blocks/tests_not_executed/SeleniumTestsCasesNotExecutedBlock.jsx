import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function SeleniumTestsCasesNotExecutedBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineDataBlockBase className={"p-3"} title={score} subtitle={"Test Cases Not Executed"} />
    </DataBlockBoxContainer>
  );
}

SeleniumTestsCasesNotExecutedBlock.propTypes = {
  score: PropTypes.string,
};

export default SeleniumTestsCasesNotExecutedBlock;
