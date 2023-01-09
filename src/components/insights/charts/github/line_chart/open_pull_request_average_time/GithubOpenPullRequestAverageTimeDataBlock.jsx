import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function GithubOpenPullRequestAverageTimeDataBlock({ data, dataPoint, lastScore, icon, className }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <ThreeLineScoreDataBlock
                className={`${className} p-3 h-100`}
                icon={icon}
                score={data}
                bottomText={"Previous: " + lastScore}
                topText={"Average Time Open Requests are Pending"}
                dataPoint={dataPoint}
            />
        </DataBlockBoxContainer>
    );
}

GithubOpenPullRequestAverageTimeDataBlock.propTypes = {
    data: PropTypes.number,
    lastScore: PropTypes.number,
    dataPoint: PropTypes.object,
    icon: PropTypes.object,
    className: PropTypes.string,
};

export default GithubOpenPullRequestAverageTimeDataBlock;
