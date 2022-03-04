import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig } from 'components/insights/charts/charts-views';
import DeploymentStatisticsActionableInsightsTable from "./DeploymentStatisticsActionableInsightsTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import { goalSuccessColor } from "../../../../charts/charts-views";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  OPSERA_BUILD_DATA_AND_DEPLOYMENT_STATISTICS_CONSTANTS as constants
} from "../OpseraBuildAndDeploymentStatistics_kpi_datapoint_identifiers";
import IconBase from "components/common/icons/IconBase";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentStatisticsDataBlockContainer({ metricData, chartData, kpiConfiguration, dashboardData, goalsData }) {
  const toastContext = useContext(DialogToastContext);

  const deploymentStatisticsDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOYMENT_STATISTICS_DATA_POINT);

  const onRowSelect = () => {    
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Opsera Deployment Statistics`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}        
      >
        <div className={"p-3"}>
          <DeploymentStatisticsActionableInsightsTable kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
        </div>        
      </FullScreenCenterOverlayContainer>
    );    
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  let successChartData = [
    {
      "id": "success rate",
      "data": chartData?.deploySuccess
    }  
  ];

  const getLeftDataBlock = () => {
    return (  
      <ThreeLineDataBlockBase
        className={"build-and-deployment-statistics-kpi"}
        topText={"Success Rate"}
        middleText={
        <MetricPercentageText
          percentage={metricData?.deploy?.successPercent}
          qualityLevel={metricData?.deploy?.count && metricData?.deploy?.count > 0 ? metricData?.deploy?.successPercent < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null }
          dataPoint={deploymentStatisticsDataPoint}
          className={"metric-block-content-text"}
        />}
        dataPoint={deploymentStatisticsDataPoint}
      />
    );
  };

  const getSuccessTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
          Goal<b> ({goalsData} %)</b>{" "}
          <IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />
          <br></br>
          Success Rate{" "}
          <IconBase icon={faSquare} iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} iconSize={"lg"} />
        </div>
        <ResponsiveLine
          data={successChartData}
          {...defaultConfig("", "Date", 
                false, true, "wholeNumbers", "monthDate2")}
          {...config()}
          tooltip={(node) => (            
            <ChartTooltip
              titles={["Date Range", "Number of Deployments", "Success Rate"]}
              values={[node.point.data.range, node.point.data.total, String(node.point.data.y) + " %"]}
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
    <HorizontalDataBlocksContainer title={"Deployment Statistics"} onClick={() => onRowSelect()}>
      <Container>
        <Row className="align-items-center">
          <Col sm={3} className={"p-2"}>
            {getLeftDataBlock()}
          </Col>
          <Col sm={9} className={"p-2"}>
            {getSuccessTrendChart()}
          </Col>
        </Row>
      </Container>
    </HorizontalDataBlocksContainer>
  );
}

DeploymentStatisticsDataBlockContainer.propTypes = {
    metricData: PropTypes.object,
    chartData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    goalsData: PropTypes.number,
};

export default DeploymentStatisticsDataBlockContainer;
