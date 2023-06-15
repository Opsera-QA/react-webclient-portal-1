import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function GitHubCommitsOpenPullRequestDataBlock({ data, onSelect }) {
    return (
        <DataBlockBoxContainer showBorder={true}  onClickFunction={onSelect}>
            <TwoLineScoreDataBlock
                className={"p-3"}
                score={data}
                subtitle={"Open Pull Requests"}
            />
        </DataBlockBoxContainer>
    );
}

GitHubCommitsOpenPullRequestDataBlock.propTypes = {
    data: PropTypes.number,
    onSelect: PropTypes.func,
};

export default GitHubCommitsOpenPullRequestDataBlock;