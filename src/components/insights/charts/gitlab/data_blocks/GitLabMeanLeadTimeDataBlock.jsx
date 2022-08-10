import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function GitLabMeanLeadTimeDataBlock({ data, previousData, getIcon, getIconColor, topText, bottomText }) {
    return (
        <DataBlockBoxContainer showBorder={true} className={'m-2'}>
            <ThreeLineScoreDataBlock
                className={`p-3 ${getIconColor(data, previousData)}`}
                score={data}
                topText={topText}
                bottomText={bottomText + previousData}
                icon={getIcon(data, previousData)}
            />
        </DataBlockBoxContainer>
    );
}

GitLabMeanLeadTimeDataBlock.propTypes = {
    data: PropTypes.number,
    previousData: PropTypes.number,
    topText: PropTypes.string,
    bottomText: PropTypes.string,
    getIcon: PropTypes.func,
    getIconColor: PropTypes.func
};

export default GitLabMeanLeadTimeDataBlock;
