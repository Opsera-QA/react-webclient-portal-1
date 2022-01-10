import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";

function SeleniumTestsCasesBlockedDataBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={score}
          subtitle={"Test Cases Blocked"} />
    </DataBlockBoxContainer>
  );
}

SeleniumTestsCasesBlockedDataBlock.propTypes = {
  score: PropTypes.string,
};

export default SeleniumTestsCasesBlockedDataBlock;
