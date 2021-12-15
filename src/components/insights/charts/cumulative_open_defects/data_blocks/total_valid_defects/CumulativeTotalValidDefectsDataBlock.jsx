import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function CumulativeTotalValidDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Total Valid Defects Closed"} />
      </div>
    </DataBlockBoxContainer>
  );
}

CumulativeTotalValidDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CumulativeTotalValidDefectsDataBlock;
