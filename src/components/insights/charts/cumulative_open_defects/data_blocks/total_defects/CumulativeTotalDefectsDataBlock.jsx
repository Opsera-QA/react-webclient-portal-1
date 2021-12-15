import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CumulativeTotalDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Total No of Defects"} />
      </div>
    </DataBlockBoxContainer>
  );
}

CumulativeTotalDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CumulativeTotalDefectsDataBlock;
