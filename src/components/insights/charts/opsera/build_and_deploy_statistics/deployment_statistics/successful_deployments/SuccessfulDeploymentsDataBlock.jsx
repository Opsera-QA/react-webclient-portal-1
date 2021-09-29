import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function DeploymentStatisticsDataBlockContainer({ successfulDeploymentCount, subTitle }) {
  return (
    <DataBlockBoxContainer className={"mr-2"}>
      <ThreeLineDataBlockBase
        className={"p-2"}
        topText={"Successful Deployments"}
        middleText={<MetricScoreText score={120} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
        // TODO: How to handle bottomText
        bottomText={"6% Decrease"}
      />
    </DataBlockBoxContainer>
  );
}

DeploymentStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  maintainabilityRating: PropTypes.number,
  technicalDebtRatio: PropTypes.number,
};

export default DeploymentStatisticsDataBlockContainer;
