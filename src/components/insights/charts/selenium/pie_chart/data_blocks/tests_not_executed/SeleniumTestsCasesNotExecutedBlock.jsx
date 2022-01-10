import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";

function SeleniumTestsCasesNotExecutedBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={score}
          subtitle={"Test Cases Not Executed"} />
    </DataBlockBoxContainer>
  );
}

SeleniumTestsCasesNotExecutedBlock.propTypes = {
  score: PropTypes.string,
};

export default SeleniumTestsCasesNotExecutedBlock;
