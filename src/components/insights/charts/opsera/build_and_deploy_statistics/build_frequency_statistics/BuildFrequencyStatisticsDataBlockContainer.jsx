import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import Col from "react-bootstrap/Col";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import "../build-and-deploy-kpi.css";
import _ from "lodash";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

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
      "data": chartData?.avgBuilds
    }  
  ];

  const getLeftDataBlock = () => {    
    return (
      <ThreeLineDataBlockNoFocusBase        
        topText={"Average Daily Builds"}
        middleText={<MetricScoreText score={metricData?.build?.perDayAverage} qualityLevel={metricData?.build?.count && metricData?.build?.count > 0 ? metricData?.build?.perDayAverage < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null } />}
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
          {...config()}
          yScale={{ type: 'linear', min: '0', max: maxVal, stacked: false, reverse: false }}
          axisLeft={{
            tickValues: [0, maxVal],
            legend: 'Avg Daily Builds',
            legendOffset: -38,
            legendPosition: 'middle'
          }}
          tooltip={(node) => (            
            <ChartTooltip
              titles={["Date Range", "Number of Builds", "Avg Daily Builds"]}
              values={[node.point.data.range, node.point.data.total, node.point.data.y]}
            />
          )}          
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
      <Col sm={3} className={"p-2"}>
        {getLeftDataBlock()}        
      </Col>      
      <Col sm={9} className={"p-2"}>
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
