import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SeleniumTestsCasesBlockedDataBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={score} subtitle={"Test Cases Blocked"} />
      </div>
    </DataBlockBoxContainer>
  );
}

SeleniumTestsCasesBlockedDataBlock.propTypes = {
  score: PropTypes.string,
};

export default SeleniumTestsCasesBlockedDataBlock;
