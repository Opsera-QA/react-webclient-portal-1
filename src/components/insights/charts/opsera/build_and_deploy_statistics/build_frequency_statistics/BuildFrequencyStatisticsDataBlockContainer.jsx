import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import SuccessfulDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/successful_deployments/SuccessfulDeploymentsDataBlock";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import FailedDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/failed_deployments/FailedDeploymentsDataBlock";
import Col from "react-bootstrap/Col";
import AverageDailyDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/average_daily/AverageDailyDeploymentsDataBlock";
import AverageDeploymentDurationDataBlock
  from "components/common/metrics/data_blocks/deployment/average_duration/AverageDeploymentDurationDataBlock";
import AverageDailyBuildsDataBlock
  from "components/common/metrics/data_blocks/build/average_daily/AverageDailyBuildsDataBlock";
import AverageBuildDurationDataBlock
  from "components/common/metrics/data_blocks/build/average_duration/AverageBuildDurationDataBlock";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildFrequencyStatisticsDataBlockContainer({ dashboardData, kpiConfiguration }) {
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
      <AverageDailyBuildsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        averageDailyCount={1.25}
        bottomText={"0.5% increase"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <AverageBuildDurationDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        averageDuration={"10 mins"}
        bottomText={"20% increase"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer
      title={"Build Frequency Statistics"}
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

BuildFrequencyStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default BuildFrequencyStatisticsDataBlockContainer;
