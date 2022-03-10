import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function TotalAutomationCandidatesDataBlock({ defects, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          dataPoint={dataPoint}
          subtitle={"Total Number of Automation Candidates"} />
    </DataBlockBoxContainer>
  );
}

TotalAutomationCandidatesDataBlock.propTypes = {
  defects: PropTypes.number,
  dataPoint: PropTypes.object
};

export default TotalAutomationCandidatesDataBlock;