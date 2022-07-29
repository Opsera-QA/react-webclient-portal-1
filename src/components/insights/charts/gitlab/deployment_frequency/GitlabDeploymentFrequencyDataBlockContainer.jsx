import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig } from 'components/insights/charts/charts-views';
import _ from "lodash";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "./GitlabDeploymentFrequencyLineChartConfig";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import { goalSuccessColor } from "../../charts-views";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function GitlabDeploymentFrequencyDataBlockContainer({ metricData, chartData, goalsData, kpiConfiguration, dataPoint }) {
  
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
  const getReverseIcon = (severity) => {
    switch (severity) {
      case "red":
        return faArrowCircleDown;
      case "green":
        return faArrowCircleUp;
      case "light-gray-text-secondary":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getLeftDataBlock = () => {
    return (
      <DataBlockBoxContainer showBorder={true}>
        <ThreeLineDataBlockBase
            className={`${metricData.prevDeploymentTrend?.trend} p-2`}
            topText={"Success Rate"}
            icon={getReverseIcon(metricData.prevDeploymentTrend?.trend)}
            bottomText={`Previous Frequency: ${metricData?.prevDeployment}`}
            middleText={
              <MetricScoreText
                  score={metricData?.averageDeployment}
                  dataPoint={dataPoint}
                  className={"metric-block-content-text"}
              />}
            dataPoint={dataPoint}
        />
      </DataBlockBoxContainer>
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
              titles={["Date Range", "Number of Deployments"]}
              values={[node.point.data.range, node.point.data.total]}
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

GitlabDeploymentFrequencyDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dataPoint: PropTypes.object
};

export default GitlabDeploymentFrequencyDataBlockContainer;
