import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricTextBase from "../../../../common/metrics/text/MetricTextBase";

function GitlabDeploymentFrequencyRecentStagesDataBlock({
  stage,
  date,
  topText,
  bottomText,
}) {
  return (
    <DataBlockBoxContainer
      showBorder={true}
      className="h-100"
    >
      <ThreeLineDataBlockBase
        className={`p-2 h-100`}
        topText={topText}
        bottomText={`${bottomText}${date}`}
        middleText={
          <MetricTextBase
            formattedText={stage}
            className={"metric-block-header-text"}
          />
        }
      />
    </DataBlockBoxContainer>
  );
}

GitlabDeploymentFrequencyRecentStagesDataBlock.propTypes = {
  stage: PropTypes.string,
  date: PropTypes.string,
  trend: PropTypes.string,
  topText: PropTypes.string,
  bottomText: PropTypes.string,
};

export default GitlabDeploymentFrequencyRecentStagesDataBlock;
