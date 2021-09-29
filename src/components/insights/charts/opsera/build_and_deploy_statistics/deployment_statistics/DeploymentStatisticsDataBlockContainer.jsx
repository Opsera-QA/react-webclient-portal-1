import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import ThreeHorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/ThreeHorizontalDataBlocksContainer";
import SuccessfulDeploymentsDataBlock
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/successful_deployments/SuccessfulDeploymentsDataBlock";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import FailedDeploymentsDataBlock
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/failed_deployements/FailedDeploymentsDataBlock";
import SuccessPercentageDataBlock
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/success_percentage/SuccessPercentageDataBlock";
import Col from "react-bootstrap/Col";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentStatisticsDataBlockContainer({ dashboardData, kpiConfiguration }) {
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
      <Col sm={4} className={"p-2"}>
        <SuccessfulDeploymentsDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          bottomText={"10% increase"}
          successfulDeploymentCount={120}
        />
      </Col>
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <Col sm={4} className={"p-2"}>
        <FailedDeploymentsDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          failedDeploymentCount={10}
          bottomText={"20% decrease"}
        />
      </Col>
    );
  };

  const getRightDataBlock = () => {
    return (
      <Col sm={4} className={"p-2"}>
        <SuccessPercentageDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          successPercentage={98}
          bottomText={"Goal 95%"}
        />
      </Col>
    );
  };

  return (
    <ThreeHorizontalDataBlocksContainer
      title={"Deployment Statistics"}
      // onClick={() => onRowSelect()}
      leftDataBlock={getLeftDataBlock()}
      middleDataBlock={getMiddleDataBlock()}
      rightDataBlock={getRightDataBlock()}
    />
  );
}

DeploymentStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default DeploymentStatisticsDataBlockContainer;
