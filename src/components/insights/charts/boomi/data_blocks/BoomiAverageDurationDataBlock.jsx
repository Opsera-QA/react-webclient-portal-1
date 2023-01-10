import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function BoomiAverageDurationDataBlock({ data, dataPoint, lastScore, icon, className  }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <ThreeLineScoreDataBlock
            className={`${className} p-2 h-70`}
            icon={icon}
            score={data}
            bottomText={"Previous: " + lastScore}
            topText={"Total Deployments"}
            dataPoint={dataPoint}
        />
    </DataBlockBoxContainer>
  );
}

BoomiAverageDurationDataBlock.propTypes = {
    data: PropTypes.number,
    lastScore: PropTypes.number,
    dataPoint: PropTypes.object,
    icon: PropTypes.object,
    className: PropTypes.string,
};

export default BoomiAverageDurationDataBlock;