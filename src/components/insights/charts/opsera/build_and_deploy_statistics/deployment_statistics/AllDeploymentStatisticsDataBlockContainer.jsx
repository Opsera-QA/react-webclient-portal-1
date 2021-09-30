import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import SuccessfulDeploymentsContainedDataBlock
  from "components/common/metrics/data_blocks/deployment/successful_deployments/SuccessfulDeploymentsContainedDataBlock";
import FailedDeploymentsContainedDataBlock
  from "components/common/metrics/data_blocks/deployment/failed_deployments/FailedDeploymentsContainedDataBlock";
import AverageDailyDeploymentsContainedDataBlock
  from "components/common/metrics/data_blocks/deployment/average_daily/AverageDailyDeploymentsContainedDataBlock";
import AverageDeploymentDurationContainedDataBlock
  from "components/common/metrics/data_blocks/deployment/average_duration/AverageDeploymentDurationContainedDataBlock";
import SuccessRateContainedDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateContainedDataBlock";
import HorizontalDataBlocksContainer
  from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";

// TODO: Pass in relevant data and don't use hardcoded data
function AllDeploymentStatisticsDataBlockContainer({ dashboardData, kpiConfiguration }) {
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

  return (
    <HorizontalDataBlocksContainer
      title={"Deployment Statistics"}
      // onClick={() => onRowSelect()}
    >
      <Col className={"px-0"}>
        <SuccessfulDeploymentsContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          successfulDeploymentCount={120}
          bottomText={"10% increase"}
        />
      </Col>
      <Col className={"px-0"}>
        <FailedDeploymentsContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          failedDeploymentCount={10}
          bottomText={"20% decrease"}
        />
      </Col>
      <Col className={"px-0"}>
        <SuccessRateContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          successPercentage={98}
          bottomText={"Goal 95%"}
        />
      </Col>
      <Col className={"px-0"}>
        <AverageDailyDeploymentsContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
          averageDailyCount={.85}
          bottomText={"15% decrease"}
        />
      </Col>
      <Col className={"px-0"}>
        <AverageDeploymentDurationContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          averageDuration={"4 mins"}
          bottomText={"20% increase"}
        />
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

AllDeploymentStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default AllDeploymentStatisticsDataBlockContainer;
