import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function BoomiAverageDurationDataBlock({ data, icon, className }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <ThreeLineScoreDataBlock
        className={`${className} p-3 h-100`}
        icon={icon}
        score={data}
        topText={"Average Duration"}
      />
    </DataBlockBoxContainer>
  );
}

BoomiAverageDurationDataBlock.propTypes = {
  data: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
};

export default BoomiAverageDurationDataBlock;