import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function GitHubCommitsTotalPullRequestsDataBlock({ data }) {
    return (
        <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
                className={"p-3 h-100"}
                score={data}
                subtitle={"Total Pull Requests"}
            />
        </DataBlockBoxContainer>
    );
}

GitHubCommitsTotalPullRequestsDataBlock.propTypes = {
    data: PropTypes.number,
};

export default GitHubCommitsTotalPullRequestsDataBlock;
