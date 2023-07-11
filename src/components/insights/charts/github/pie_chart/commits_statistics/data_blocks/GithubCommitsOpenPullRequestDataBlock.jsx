import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "../../../../../../common/metrics/score/ThreeLineScoreDataBlock";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";

function GitHubCommitsOpenPullRequestDataBlock({ data, icon, className, dataPoint, onSelect, lastScore, iconOverlayBody}) {
  return (
    <DataBlockBoxContainer showBorder={true}  onClickFunction={onSelect}>
      <TwoLineScoreDataBlock
        className={"p-3 h-100"}
        score={data}
        subtitle={"Total Open Pull Requests"}
      />
    </DataBlockBoxContainer>
  );
}

GitHubCommitsOpenPullRequestDataBlock.propTypes = {
  data: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default GitHubCommitsOpenPullRequestDataBlock;