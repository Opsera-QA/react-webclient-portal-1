import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function BoomiFrequencyDataBlock({ data, dataPoint, lastScore, icon, className }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <ThreeLineScoreDataBlock
                className={`${className} p-3 h-100`}
                icon={icon}
                score={data}
                bottomText={"Previous: " + lastScore}
                topText={"Frequency"}
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

BoomiFrequencyDataBlock.propTypes = {
    data: PropTypes.number,
    lastScore: PropTypes.number,
    dataPoint: PropTypes.object,
    icon: PropTypes.object,
    className: PropTypes.string,
};

export default BoomiFrequencyDataBlock;
