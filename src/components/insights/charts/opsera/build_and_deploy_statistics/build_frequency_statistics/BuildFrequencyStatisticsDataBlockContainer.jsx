import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import AverageDailyBuildsDataBlock
  from "components/common/metrics/data_blocks/build/average_daily/AverageDailyBuildsDataBlock";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import "../build-and-deploy-kpi.css";
import _ from "lodash";
import ChartTooltip from "components/insights/charts/ChartTooltip";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildFrequencyStatisticsDataBlockContainer({ metricData, chartData, goalsData }) {    

  const [maxVal, setMaxVal] = useState(goalsData);

  useEffect(() => {
    let dataHigh = {x: "", y: 0};
    dataHigh = _.maxBy(chartData?.avgBuilds, 'y');
    const high = dataHigh?.y > goalsData ? dataHigh?.y : goalsData;
    setMaxVal(Math.ceil(high));
  }, [goalsData, chartData]);

  const dailyBuildsChartData = [
    {
      "id": "average daily builds",
      "color": "#ABA4CC",
      "data": chartData?.avgBuilds
    }  
  ];

  const getLeftDataBlock = () => {    
    return (
      <AverageDailyBuildsDataBlock
        className={'build-deploy-kpi'}
        qualityLevel={metricData?.build?.perDayAverage < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS}
        averageDailyCount={metricData?.build?.perDayAverage || 0}
        bottomText={`Goal: ${goalsData}`}
      />
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <ResponsiveLine
          data={dailyBuildsChartData}
          {...defaultConfig("Count", "Date", 
                false, false, "numbers", "monthDate2")}
          yScale={{ type: 'linear', min: '0', max: maxVal, stacked: false, reverse: false }}          
          enableGridX={false}
          enableGridY={false}
          tooltip={(node) => (            
            <ChartTooltip
              titles={["Date Range", "Number of Builds", "Avg Daily Builds"]}
              values={[node.point.data.range, node.point.data.total, node.point.data.y]}
            />
          )}
          axisLeft={{            
            tickValues: [0, maxVal],
            legend: 'Avg Daily Builds',
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
      title={"Build Frequency Statistics"}      
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

BuildFrequencyStatisticsDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  goalsData: PropTypes.number,
};

export default BuildFrequencyStatisticsDataBlockContainer;
