import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import SuccessRateDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateDataBlock";
import Col from "react-bootstrap/Col";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import BuildStatisticsActionableInsightsTable from "./BuildStatisticsActionableInsightsTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";

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
      "color": "#ABA4CC",
      "data": chartData?.buildSuccess
    }  
  ];

  const getLeftDataBlock = () => {
    return (
      <SuccessRateDataBlock
        className={'build-deploy-kpi'}
        qualityLevel={metricData?.build?.successPercent < goalsData ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS}
        successPercentage={metricData?.build?.successPercent || 0}
        bottomText={`Goal: ${goalsData}%`}
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
          yScale={{ type: 'linear', min: '0', max: '100', stacked: false, reverse: false }}
          enableGridX={false}
          enableGridY={false}
          tooltip={(node) => (            
            <ChartTooltip
              titles={["Date Range", "Number of Builds", "Success Rate"]}
              values={[node.point.data.range, node.point.data.total, String(node.point.data.y) + " %"]}
            />
          )}
          axisLeft={{            
            tickValues: [0, 50, 100],
            legend: 'Success Rate %',
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
      title={"Build Statistics"}
      onClick={() => onRowSelect()}
    >      
      <Col sm={4} className={"p-2"}>
        {getLeftDataBlock()}        
      </Col>
      <Col sm={8} className={"p-2"}>
        {getSuccessTrendChart()}
      </Col>
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
