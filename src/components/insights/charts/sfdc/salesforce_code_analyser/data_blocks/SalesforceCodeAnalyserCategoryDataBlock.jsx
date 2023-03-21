import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function SalesforceCodeAnalyserCategoryDataBlock({ data, dataPoint, lastScore, icon, className, onSelect  }) {
    return (
        <DataBlockBoxContainer showBorder={true} onClickFunction={() => onSelect()}>
            <ThreeLineScoreDataBlock
                className={`${className} p-2 h-70`}
                icon={icon}
                score={data}
                bottomText={`Previous: ${lastScore || lastScore === 0? lastScore : "NA"}`}
                topText={"Total Issues By Category"}
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

SalesforceCodeAnalyserCategoryDataBlock.propTypes = {
    data: PropTypes.number,
    lastScore: PropTypes.number,
    dataPoint: PropTypes.object,
    icon: PropTypes.object,
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
};

export default SalesforceCodeAnalyserCategoryDataBlock;