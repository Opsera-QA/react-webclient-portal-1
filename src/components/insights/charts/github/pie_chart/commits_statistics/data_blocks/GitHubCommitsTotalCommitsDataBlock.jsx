import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function GitHubCommitsTotalCommitsDataBlock({ data, onSelect }) {
    return (
        <DataBlockBoxContainer showBorder={true}  onClickFunction={onSelect}>
            <TwoLineScoreDataBlock
                className={"p-3"}
                score={data}
                subtitle={"Total Commits"}
            />
        </DataBlockBoxContainer>
    );
}

GitHubCommitsTotalCommitsDataBlock.propTypes = {
    data: PropTypes.number,
    onSelect: PropTypes.func,
};

export default GitHubCommitsTotalCommitsDataBlock;