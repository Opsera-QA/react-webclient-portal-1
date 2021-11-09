import React from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import AverageDailyDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/average_daily/AverageDailyDeploymentsDataBlock";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentFrequencyStatisticsDataBlockContainerV2({ metricData, chartData, goalsData }) {
  
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
        className={'build-deploy-kpi'}
        qualityLevel={metricData?.deploy?.perDayAverage < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS}
        averageDailyCount={metricData?.deploy?.perDayAverage || 0}
        bottomText={`Goal: ${goalsData}`}
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
          yScale={{ type: 'linear', min: '0', max: goalsData, stacked: false, reverse: false }}          
          enableGridX={false}
          enableGridY={false}
          axisLeft={{            
            tickValues: [0, goalsData],
            legend: 'Avg Daily Deployments',
            legendOffset: -38,
            legendPosition: 'middle'
          }}         
          colors={getColor}
          pointSize={6}
          markers={[
            {
                axis: 'y',
                value: goalsData,
                lineStyle: { stroke: '#00897b', strokeWidth: 2 },
                legend: 'Goal',
            }            
          ]}
        />
      </div>
    );
  };

  return (
    <HorizontalDataBlocksContainer
      title={"Deployment Frequency Statistics"}
      // onClick={() => onRowSelect()}
    >      
        <Col sm={4} className={"p-2"}>
          {getLeftDataBlock()}          
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
  goalsData: PropTypes.number,
};

export default DeploymentFrequencyStatisticsDataBlockContainerV2;
