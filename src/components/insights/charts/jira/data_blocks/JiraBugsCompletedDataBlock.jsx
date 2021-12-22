import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function JiraBugsCompletedDataBlock({ data }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={data} subtitle={"Bugs Completed"} />
      </div>
    </DataBlockBoxContainer>
  );
}

JiraBugsCompletedDataBlock.propTypes = {
  data: PropTypes.number,
};

export default JiraBugsCompletedDataBlock;
