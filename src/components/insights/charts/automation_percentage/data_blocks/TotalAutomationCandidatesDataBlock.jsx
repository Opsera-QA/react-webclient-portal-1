import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function TotalAutomationCandidatesDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Total Number of Automation Candidates"} />
      </div>
    </DataBlockBoxContainer>
  );
}

TotalAutomationCandidatesDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default TotalAutomationCandidatesDataBlock;