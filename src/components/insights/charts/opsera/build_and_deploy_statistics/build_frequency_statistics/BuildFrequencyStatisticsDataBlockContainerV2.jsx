import React, { useState } from "react";
import PropTypes from "prop-types";
// import Model from "core/data_model/model";
// import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
// import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import SuccessfulDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/successful_deployments/SuccessfulDeploymentsDataBlock";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import FailedDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/failed_deployments/FailedDeploymentsDataBlock";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AverageDailyDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/average_daily/AverageDailyDeploymentsDataBlock";
import AverageDeploymentDurationDataBlock
  from "components/common/metrics/data_blocks/deployment/average_duration/AverageDeploymentDurationDataBlock";
import AverageDailyBuildsDataBlock
  from "components/common/metrics/data_blocks/build/average_daily/AverageDailyBuildsDataBlock";
import AverageBuildDurationDataBlock
  from "components/common/metrics/data_blocks/build/average_duration/AverageBuildDurationDataBlock";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {  kpiGoalsFilterMetadata  } from "components/insights/marketplace/charts/kpi-configuration-metadata";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildFrequencyStatisticsDataBlockContainer({ metricData, chartData, kpiConfiguration }) {
  // const toastContext = useContext(DialogToastContext);

  // const onRowSelect = () => {
  //   const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
  //   toastContext.showOverlayPanel(
  //     <ChartDetailsOverlay
  //       dashboardData={dashboardData}
  //       kpiConfiguration={kpiConfiguration}
  //       chartModel={chartModel}
  //       kpiIdentifier={"sonar-ratings-debt-ratio"}
  //     />);
  // };
  
  const [kpiGoalsFilter, setKpiGoalsFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "goals", kpiGoalsFilterMetadata)
  );

  const dailyBuildsChartData = [
    {
      "id": "average daily builds",
      "color": "hsl(2, 54%, 65%)",
      "data": chartData?.avgBuilds
    }  
  ];

  const getLeftDataBlock = () => {    
    return (
      <AverageDailyBuildsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        averageDailyCount={metricData?.build?.perDayAverage || 0}
        bottomText={`Goal: ${kpiGoalsFilter.getData("value").average_builds}`}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <AverageBuildDurationDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        averageDuration={metricData?.build?.avgDuration || 0}
        // bottomText={"20% increase"}
      />
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <ResponsiveLine
          data={dailyBuildsChartData}
          {...defaultConfig("", "", 
                false, false, "numbers", "string")}
          yScale={{ type: 'linear', min: '0', max: '2', stacked: false, reverse: false }}          
          enableGridX={false}
          enableGridY={false}
          axisLeft={{            
            tickValues: [0, 1]
          }}
          // axisLeft={null}          
          colors={getColor}
          pointSize={6}
          markers={[
            {
                axis: 'y',
                value: kpiGoalsFilter.getData("value").average_builds,
                lineStyle: { stroke: '#00897b', strokeWidth: 1 },
                legend: 'Goal',
            }            
          ]}
        />
      </div>
    );
  };

  if(!metricData || !chartData){
    return (<LoadingDialog />);
  }

  return (
    <HorizontalDataBlocksContainer
      title={"Build Frequency Statistics"}
      // onClick={() => onRowSelect()}
    >
      <Col sm={4} className={"p-2"}>
        {getLeftDataBlock()}
        {/* <hr/>
        <Row>
          <Col sm={2} className={"p-2"}></Col>
          <Col sm={8} className={"p-2"}>
            {getRightDataBlock()}
          </Col>
          <Col sm={2} className={"p-2"}></Col>
        </Row> */}
      </Col>      
      <Col sm={8} className={"p-2"}>
        {getTrendChart()}
      </Col>
    </HorizontalDataBlocksContainer>
  );
}

BuildFrequencyStatisticsDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};

export default BuildFrequencyStatisticsDataBlockContainer;
