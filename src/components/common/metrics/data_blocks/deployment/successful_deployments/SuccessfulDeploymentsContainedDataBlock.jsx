import React from "react";
import PropTypes from "prop-types";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ContainedThreeLineDataBlockBase
  from "components/common/metrics/data_blocks/base/ContainedThreeLineDataBlockBase";

function SuccessfulDeploymentsContainedDataBlock({ className, successfulDeploymentCount, qualityLevel, bottomText, onClickFunction }) {
  return (
    <DataBlockBoxContainer className={className} onClickFunction={onClickFunction}>
      <ContainedThreeLineDataBlockBase
        titleText={"Successful Deployments"}
        middleText={<MetricScoreText score={successfulDeploymentCount} qualityLevel={qualityLevel} />}
        bottomText={bottomText}
      />
    </DataBlockBoxContainer>
  );
}

SuccessfulDeploymentsContainedDataBlock.propTypes = {
  successfulDeploymentCount: PropTypes.number,
  className: PropTypes.string,
  qualityLevel: PropTypes.string,
  bottomText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default SuccessfulDeploymentsContainedDataBlock;
