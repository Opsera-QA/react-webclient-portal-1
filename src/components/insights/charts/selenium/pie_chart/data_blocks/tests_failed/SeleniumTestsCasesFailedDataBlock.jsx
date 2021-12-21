import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SeleniumTestsCasesFailedDataBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineDataBlockBase className={"p-3"} title={score} subtitle={"Test Cases Failed"} />
    </DataBlockBoxContainer>
  );
}

SeleniumTestsCasesFailedDataBlock.propTypes = {
  score: PropTypes.string,
};

export default SeleniumTestsCasesFailedDataBlock;
