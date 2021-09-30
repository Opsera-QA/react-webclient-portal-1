import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SuccessfulDeploymentsDataBlock({ className, successfulDeploymentCount, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ThreeLineDataBlockBase
        topText={"Successful Deployments"}
        middleText={<MetricScoreText score={successfulDeploymentCount} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

SuccessfulDeploymentsDataBlock.propTypes = {
  successfulDeploymentCount: PropTypes.number,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default SuccessfulDeploymentsDataBlock;
