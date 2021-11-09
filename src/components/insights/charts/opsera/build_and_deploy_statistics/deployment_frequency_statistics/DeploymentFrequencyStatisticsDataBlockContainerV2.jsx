import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// import Model from "core/data_model/model";
// import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
// import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AverageDailyDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/average_daily/AverageDailyDeploymentsDataBlock";
import AverageDeploymentDurationDataBlock
  from "components/common/metrics/data_blocks/deployment/average_duration/AverageDeploymentDurationDataBlock";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {  kpiGoalsFilterMetadata  } from "components/insights/marketplace/charts/kpi-configuration-metadata";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentFrequencyStatisticsDataBlockContainerV2({ metricData, chartData, kpiConfiguration }) {
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
  
  let dailyDeploymentsChartData = [
    {
      "id": "average daily deployments",
      "color": "#ABA4CC",
      "data": chartData?.avgDeployments
    }  
  ];

  const getLeftDataBlock = () => {
    return (
      <AverageDailyDeploymentsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        averageDailyCount={metricData?.deploy?.perDayAverage || 0}
        bottomText={`Goal: ${kpiGoalsFilter.getData("value").average_deployments}`}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <AverageDeploymentDurationDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        averageDuration={metricData?.deploy?.avgDuration || 0}
        // bottomText={"20% increase"}
      />
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <ResponsiveLine
          data={dailyDeploymentsChartData}
          {...defaultConfig("", "Month", 
                false, false, "numbers", "string")}
          yScale={{ type: 'linear', min: '0', max: kpiGoalsFilter.getData("value").average_deployments, stacked: false, reverse: false }}          
          enableGridX={false}
          enableGridY={false}
          axisLeft={{            
            tickValues: [0, kpiGoalsFilter.getData("value").average_deployments],
            legend: 'Avg Daily Deployments',
            legendOffset: -38,
            legendPosition: 'middle'
          }}
          // axisLeft={null}                    
          colors={getColor}
          pointSize={6}
          markers={[
            {
                axis: 'y',
                value: kpiGoalsFilter.getData("value").average_deployments,
                lineStyle: { stroke: '#00897b', strokeWidth: 2 },
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
      title={"Deployment Frequency Statistics"}
      // onClick={() => onRowSelect()}
    >      
        <Col sm={4} className={"p-2"}>
          {getLeftDataBlock()}        
          {/* <hr/>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8} className={"p-2"}>
              {getRightDataBlock()}
            </Col>
            <Col sm={2}></Col>
          </Row> */}
        </Col>        
        <Col sm={8} className={"p-2"}>
          {getTrendChart()}
        </Col>              
    </HorizontalDataBlocksContainer>
  );
}

DeploymentFrequencyStatisticsDataBlockContainerV2.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};

export default DeploymentFrequencyStatisticsDataBlockContainerV2;
