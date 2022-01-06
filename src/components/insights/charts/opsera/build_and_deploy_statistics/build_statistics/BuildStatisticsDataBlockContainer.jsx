import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import BuildStatisticsActionableInsightsTable from "./BuildStatisticsActionableInsightsTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../OpseraBuildAndDeployLineChartConfig";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import { goalSuccessColor } from "../../../../charts/charts-views";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildStatisticsDataBlockContainer({ metricData, chartData, kpiConfiguration, dashboardData, goalsData }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = () => {    
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Opsera Build Statistics`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}        
      >
        <div className={"p-3"}>
          <BuildStatisticsActionableInsightsTable kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
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
      "data": chartData?.buildSuccess
    }  
  ];

  const getLeftDataBlock = () => {
    return (      
      <ThreeLineDataBlockNoFocusBase        
        topText={"Success Rate"}
        middleText={<MetricPercentageText percentage={metricData?.build?.successPercent} qualityLevel={metricData?.build?.count && metricData?.build?.count > 0 ? metricData?.build?.successPercent < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS : null } />}
        bottomText={`Goal: ${goalsData}`}
      />
    );
  };

  const getSuccessTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
          Goal<b> ({goalsData} %)</b>{" "}
          <FontAwesomeIcon icon={faMinus} color={goalSuccessColor} size="lg" />
          <br></br>
          Success Rate{" "}
          <FontAwesomeIcon icon={faSquare} color={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} size="lg" />
        </div>
        <ResponsiveLine
          data={successChartData}
          {...defaultConfig("", "Date", 
                false, false, "wholeNumbers", "monthDate2")}          
          {...config()}
          tooltip={(node) => (            
            <ChartTooltip
              key={node.point.data.range}
              titles={["Date Range", "Number of Builds", "Success Rate"]}
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
    <HorizontalDataBlocksContainer
      title={"Build Statistics"}
      onClick={() => onRowSelect()}
    >
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

BuildStatisticsDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  goalsData: PropTypes.number,
};

export default BuildStatisticsDataBlockContainer;
