import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function FailedDeploymentsDataBlock({ className, failedDeploymentCount, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ThreeLineDataBlockBase
        className={"p-2"}
        topText={"Failed Deployments"}
        middleText={<MetricScoreText score={failedDeploymentCount} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

FailedDeploymentsDataBlock.propTypes = {
  failedDeploymentCount: PropTypes.number,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default FailedDeploymentsDataBlock;
