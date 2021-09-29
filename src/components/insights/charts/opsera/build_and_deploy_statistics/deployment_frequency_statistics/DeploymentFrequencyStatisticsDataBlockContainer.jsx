import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import AverageDailyDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/average_daily/AverageDailyDeploymentsDataBlock";
import AverageDeploymentDurationDataBlock
  from "components/common/metrics/data_blocks/deployment/average_duration/AverageDeploymentDurationDataBlock";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentFrequencyStatisticsDataBlockContainer({ dashboardData, kpiConfiguration }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {
    const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
    toastContext.showOverlayPanel(
      <ChartDetailsOverlay
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
        chartModel={chartModel}
        kpiIdentifier={"sonar-ratings-debt-ratio"}
      />);
  };

  const getLeftDataBlock = () => {
    return (
      <AverageDailyDeploymentsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        averageDailyCount={.85}
        bottomText={"15% decrease"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <AverageDeploymentDurationDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        averageDuration={"4 mins"}
        bottomText={"20% increase"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer
      className={"mb-3"}
      title={"Deployment Frequency Statistics"}
      // onClick={() => onRowSelect()}
    >
      <Col sm={6} className={"p-2"}>
        {getLeftDataBlock()}
      </Col>
      <Col sm={6} className={"p-2"}>
        {getRightDataBlock()}
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

DeploymentFrequencyStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default DeploymentFrequencyStatisticsDataBlockContainer;
