import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import SuccessRateDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateDataBlock";
import Col from "react-bootstrap/Col";
import SuccessfulBuildsDataBlock
  from "components/common/metrics/data_blocks/build/successful_builds/SuccessfulBuildsDataBlock";
import FailedBuildsDataBlock
  from "components/common/metrics/data_blocks/build/failed_builds/FailedBuildsDataBlock";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildStatisticsDataBlockContainer({ dashboardData, kpiConfiguration }) {
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
      <SuccessfulBuildsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        successfulBuildCount={100}
        bottomText={"10% decrease"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <FailedBuildsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        failedBuildCount={30}
        bottomText={"20% increase"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <SuccessRateDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        successPercentage={80}
        bottomText={"Goal: 95%"}
      />
    );
  };

  return (
    <HorizontalDataBlocksContainer
      title={"Build Statistics"}
      // onClick={() => onRowSelect()}
    >
      <Col sm={4} className={"p-2"}>
        {getLeftDataBlock()}
      </Col>
      <Col sm={4} className={"p-2"}>
        {getMiddleDataBlock()}
      </Col>
      <Col sm={4} className={"p-2"}>
        {getRightDataBlock()}
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

BuildStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default BuildStatisticsDataBlockContainer;
