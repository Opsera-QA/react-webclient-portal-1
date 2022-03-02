import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig } from 'components/insights/charts/charts-views';
import "../build-and-deploy-kpi.css";
import _ from "lodash";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import { goalSuccessColor } from "../../../../charts/charts-views";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  OPSERA_BUILD_DATA_AND_DEPLOYMENT_STATISTICS_CONSTANTS as constants
} from "../OpseraBuildAndDeploymentStatistics_kpi_datapoint_identifiers";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildFrequencyStatisticsDataBlockContainer({ metricData, chartData, goalsData, kpiConfiguration }) {

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

  const buildFrequencyStatisticsDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.BUILD_FREQUENCY_STATISTICS_DATA_POINT);

  const getLeftDataBlock = () => {    
    return (      
      <ThreeLineDataBlockNoFocusBase        
        topText={"Average Daily Builds"}
        middleText={
        <MetricScoreText
          score={metricData?.build?.perDayAverage}
          qualityLevel={metricData?.build?.count && metricData?.build?.count > 0 ? metricData?.build?.perDayAverage < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null }
          dataPoint={buildFrequencyStatisticsDataPoint}
        />}
        dataPoint={buildFrequencyStatisticsDataPoint}
      />
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
          Goal<b> ({goalsData})</b>{" "}
          <FontAwesomeIcon icon={faMinus} color={goalSuccessColor} size="lg" />
          <br></br>
          Average Daily Builds{" "}
          <FontAwesomeIcon icon={faSquare} color={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} size="lg" />
        </div>
        <ResponsiveLine
          data={dailyBuildsChartData}
          {...defaultConfig("Count", "Date", 
                false, true, "numbers", "monthDate2")}
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
                lineStyle: { stroke: goalSuccessColor, strokeWidth: 2 },
                legend: '',
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

BuildFrequencyStatisticsDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object
};

export default BuildFrequencyStatisticsDataBlockContainer;
