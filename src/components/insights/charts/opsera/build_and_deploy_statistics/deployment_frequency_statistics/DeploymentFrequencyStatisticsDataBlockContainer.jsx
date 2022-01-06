import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import _ from "lodash";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentFrequencyStatisticsDataBlockContainer({ metricData, chartData, goalsData }) {
  
  const [maxVal, setMaxVal] = useState(goalsData);

  useEffect(() => {
    let dataHigh = {x: "", y: 0};
    dataHigh = _.maxBy(chartData?.avgDeployments, 'y');
    const high = dataHigh?.y > goalsData ? dataHigh?.y : goalsData;
    setMaxVal(Math.ceil(high));
  }, [goalsData, chartData]);

  let dailyDeploymentsChartData = [
    {
      "id": "average daily deployments",
      "data": chartData?.avgDeployments
    }  
  ];

  const getLeftDataBlock = () => {
    return (      
      <ThreeLineDataBlockNoFocusBase        
        topText={"Average Daily Deployments"}
        middleText={<MetricScoreText score={metricData?.deploy?.perDayAverage} qualityLevel={metricData?.deploy?.count && metricData?.deploy?.count > 0 ? metricData?.deploy?.perDayAverage < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null } />}
        bottomText={`Goal: ${goalsData}`}
      />
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <ResponsiveLine
          data={dailyDeploymentsChartData}
          {...defaultConfig("", "Date", 
                false, false, "numbers", "monthDate2")}
          {...config()}
          yScale={{ type: 'linear', min: '0', max: maxVal, stacked: false, reverse: false }}
          axisLeft={{            
            tickValues: [0, maxVal],
            legend: 'Avg Daily Deployments',
            legendOffset: -38,
            legendPosition: 'middle'
          }}
          tooltip={(node) => (            
            <ChartTooltip
              titles={["Date Range", "Number of Deployments", "Avg Daily Deployments"]}
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
      title={"Deployment Frequency Statistics"}
      // onClick={() => onRowSelect()}
    >
      <Container>
        <Row className="align-items-center">
          <Col sm={3} className={"p-2"}>
            {getLeftDataBlock()}
          </Col>
          <Col sm={9} className={"p-2"}>
            {getTrendChart()}
          </Col>
        </Row>
      </Container>
    </HorizontalDataBlocksContainer>
  );
}

DeploymentFrequencyStatisticsDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  goalsData: PropTypes.number,
};

export default DeploymentFrequencyStatisticsDataBlockContainer;
