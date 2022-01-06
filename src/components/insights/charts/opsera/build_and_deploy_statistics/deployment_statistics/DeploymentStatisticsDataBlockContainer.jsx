import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import DeploymentStatisticsActionableInsightsTable from "./DeploymentStatisticsActionableInsightsTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentStatisticsDataBlockContainer({ metricData, chartData, kpiConfiguration, dashboardData, goalsData }) {
  const toastContext = useContext(DialogToastContext);

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
      <ThreeLineDataBlockNoFocusBase        
        topText={"Success Rate"}
        middleText={<MetricPercentageText percentage={metricData?.deploy?.successPercent} qualityLevel={metricData?.deploy?.count && metricData?.deploy?.count > 0 ? metricData?.deploy?.successPercent < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null } />}
        bottomText={`Goal: ${goalsData}`}
      />
    );
  };

  const getSuccessTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <ResponsiveLine
          data={successChartData}
          {...defaultConfig("", "Date", 
                false, false, "wholeNumbers", "monthDate2")}
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
                lineStyle: { stroke: '#00897b', strokeWidth: 2 },
                legend: 'Goal',
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
