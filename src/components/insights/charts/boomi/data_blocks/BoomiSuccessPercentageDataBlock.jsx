import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function BoomiSuccessPercentageDataBlock({ data, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-3 h-100"}
        score={data}
        subtitle={"Success %"}
        dataPoint={dataPoint}
      />
    </DataBlockBoxContainer>
  );
}

BoomiSuccessPercentageDataBlock.propTypes = {
  data: PropTypes.number,
  dataPoint: PropTypes.object
};

export default BoomiSuccessPercentageDataBlock;