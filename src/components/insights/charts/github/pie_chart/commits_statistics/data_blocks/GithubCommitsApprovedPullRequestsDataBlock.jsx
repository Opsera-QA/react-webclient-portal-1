import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function GitHubCommitsApprovedPullRequestsRequestDataBlock({ data, onSelect }) {
    return (
        <DataBlockBoxContainer showBorder={true}  onClickFunction={onSelect}>
            <TwoLineScoreDataBlock
                className={"p-3 h-100"}
                score={data}
                subtitle={"Approved Pull Requests"}
            />
        </DataBlockBoxContainer>
    );
}

GitHubCommitsApprovedPullRequestsRequestDataBlock.propTypes = {
    data: PropTypes.number,
    onSelect: PropTypes.func,
};

export default GitHubCommitsApprovedPullRequestsRequestDataBlock;