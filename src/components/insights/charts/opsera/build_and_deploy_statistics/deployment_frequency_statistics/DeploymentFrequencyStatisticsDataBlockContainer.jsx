import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig } from 'components/insights/charts/charts-views';
import _ from "lodash";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import { goalSuccessColor } from "../../../../charts/charts-views";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  OPSERA_BUILD_DATA_AND_DEPLOYMENT_STATISTICS_CONSTANTS as constants
} from "../OpseraBuildAndDeploymentStatistics_kpi_datapoint_identifiers";
import IconBase from "components/common/icons/IconBase";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentFrequencyStatisticsDataBlockContainer({ metricData, chartData, goalsData, kpiConfiguration }) {
  
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

  const deploymentFrequencyStatisticsDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOYMENT_FREQUENCY_STATISTICS_DATA_POINT);

  const getLeftDataBlock = () => {
    return (      
      <ThreeLineDataBlockBase
        className={"build-and-deployment-statistics-kpi"}
        topText={"Average Daily Deployments"}
        middleText={
        <MetricScoreText
          score={metricData?.deploy?.perDayAverage}
          qualityLevel={metricData?.deploy?.count && metricData?.deploy?.count > 0 ? metricData?.deploy?.perDayAverage < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null }
          dataPoint={deploymentFrequencyStatisticsDataPoint}
          className={"metric-block-content-text"}
        />}
        dataPoint={deploymentFrequencyStatisticsDataPoint}
      />
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
          Goal<b> ({goalsData})</b>{" "}
          <IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />
          <br></br>
          Average Daily Builds{" "}
          <IconBase icon={faSquare} iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} iconSize={"lg"} />
        </div>
        <ResponsiveLine
          data={dailyDeploymentsChartData}
          {...defaultConfig("", "Date", 
                false, true, "numbers", "monthDate2")}
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
  kpiConfiguration: PropTypes.object,
};

export default DeploymentFrequencyStatisticsDataBlockContainer;
