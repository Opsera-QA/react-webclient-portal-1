import React, {useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import SuccessfulBuildsContainedDataBlock
  from "components/common/metrics/data_blocks/build/successful_builds/SuccessfulBuildsContainedDataBlock";
import FailedBuildsContainedDataBlock
  from "components/common/metrics/data_blocks/build/failed_builds/FailedBuildsContainedDataBlock";
import SuccessRateContainedDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateContainedDataBlock";
import AverageDailyBuildsContainedDataBlock
  from "components/common/metrics/data_blocks/build/average_daily/AverageDailyBuildsContainedDataBlock";
import AverageBuildDurationContainedDataBlock
  from "components/common/metrics/data_blocks/build/average_duration/AverageBuildDurationContainedDataBlock";

// TODO: Pass in relevant data and don't use hardcoded data
function AllBuildStatisticsDataBlockContainer({ dashboardData, kpiConfiguration }) {
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
      title={"Build Statistics"}
      // onClick={() => onRowSelect()}
    >
      <Col className={"px-0"}>
        <SuccessfulBuildsContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
          successfulBuildCount={100}
          bottomText={"10% decrease"}
        />
      </Col>
      <Col className={"px-0"}>
        <FailedBuildsContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
          failedBuildCount={30}
          bottomText={"20% increase"}
        />
      </Col>
      <Col className={"px-0"}>
        <SuccessRateContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
          successPercentage={80}
          bottomText={"Goal: 95%"}
        />
      </Col>
      <Col className={"px-0"}>
        <AverageDailyBuildsContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
          averageDailyCount={1.25}
          bottomText={"0.5% increase"}
        />
      </Col>
      <Col className={"px-0"}>
        <AverageBuildDurationContainedDataBlock
          qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
          averageDuration={"10 mins"}
          bottomText={"20% increase"}
        />
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

AllBuildStatisticsDataBlockContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default AllBuildStatisticsDataBlockContainer;
