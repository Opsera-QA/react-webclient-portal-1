import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function GitLabMeanLeadTimeDataBlock({ data, previousData, getIcon, getIconColor }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <ThreeLineScoreDataBlock
                className={`p-3 ${getIconColor(data, previousData)}`}
                score={data}
                topText={"Mean Lead Time (Days)"}
                bottomText={"Previous Lead Time: " + previousData}
                icon={getIcon(data, previousData)}
            />
        </DataBlockBoxContainer>
    );
}

GitLabMeanLeadTimeDataBlock.propTypes = {
    data: PropTypes.number,
    previousData: PropTypes.number,
    getIcon: PropTypes.func,
    getIconColor: PropTypes.func
};

export default GitLabMeanLeadTimeDataBlock;
