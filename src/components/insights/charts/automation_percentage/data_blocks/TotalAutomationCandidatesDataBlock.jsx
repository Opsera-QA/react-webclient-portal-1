import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function TotalAutomationCandidatesDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          subtitle={"Total Number of Automation Candidates"} />
    </DataBlockBoxContainer>
  );
}

TotalAutomationCandidatesDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default TotalAutomationCandidatesDataBlock;