import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";

function SeleniumTestsTotalDataBlock({ score }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={score}
          subtitle={"Total Test Cases"} />
    </DataBlockBoxContainer>
  );
}

SeleniumTestsTotalDataBlock.propTypes = {
  score: PropTypes.string,
};

export default SeleniumTestsTotalDataBlock;
