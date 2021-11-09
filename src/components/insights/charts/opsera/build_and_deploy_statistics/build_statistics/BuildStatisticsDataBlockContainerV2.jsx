import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import SuccessRateDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateDataBlock";
import Col from "react-bootstrap/Col";
import SuccessfulBuildsDataBlock
  from "components/common/metrics/data_blocks/build/successful_builds/SuccessfulBuildsDataBlock";
import FailedBuildsDataBlock
  from "components/common/metrics/data_blocks/build/failed_builds/FailedBuildsDataBlock";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {  kpiGoalsFilterMetadata  } from "components/insights/marketplace/charts/kpi-configuration-metadata";
import BuildStatisticsActionableInsightsTable from "./BuildStatisticsActionableInsightsTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildStatisticsDataBlockContainer({ metricData, chartData, kpiConfiguration }) {
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
          <BuildStatisticsActionableInsightsTable />
        </div>        
      </FullScreenCenterOverlayContainer>
    );    
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const [kpiGoalsFilter, setKpiGoalsFilter] = useState(
    modelHelpers.getDashboardFilterModel(kpiConfiguration, "goals", kpiGoalsFilterMetadata)
  );

  let successChartData = [
    {
      "id": "success rate",
      "color": "#ABA4CC",
      "data": chartData?.buildSuccess
    }  
  ];

  const getLeftDataBlock = () => {
    return (
      <SuccessfulBuildsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        successfulBuildCount={metricData?.build?.success || 0}
        // bottomText={"10% decrease"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <FailedBuildsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        failedBuildCount={metricData?.build?.failure || 0}
        // bottomText={"20% increase"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <SuccessRateDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        successPercentage={metricData?.build?.successPercent || 0}
        bottomText={`Goal: ${kpiGoalsFilter.getData("value").build_success_rate}%`}
      />
    );
  };

  const getSuccessTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <ResponsiveLine
          data={successChartData}
          {...defaultConfig("", "Month", 
                false, false, "wholeNumbers", "string")}
          yScale={{ type: 'linear', min: '0', max: '100', stacked: false, reverse: false }}
          enableGridX={false}
          enableGridY={false}
          axisLeft={{            
            tickValues: [0, 50, 100],
            legend: 'Success Rate %',
            legendOffset: -38,
            legendPosition: 'middle'
          }}
          // axisLeft={null}         
          colors={getColor}
          pointSize={6}
          markers={[
            {
                axis: 'y',
                value: kpiGoalsFilter.getData("value").build_success_rate,
                lineStyle: { stroke: '#00897b', strokeWidth: 2 },
                legend: 'Goal',
            }         
          ]}
        />
      </div>
    );
  };

  if(!metricData || !chartData){
    return (<LoadingDialog />);
  }

  return (
    <HorizontalDataBlocksContainer
      title={"Build Statistics"}
      onClick={() => onRowSelect()}
    >      
      <Col sm={4} className={"p-2"}>
        {getRightDataBlock()}
        {/* <hr/>
        <Row>
          <Col sm={6} className={"p-2"}>
            {getLeftDataBlock()}
          </Col>
          <Col sm={6} className={"p-2"}>
            {getMiddleDataBlock()}
          </Col>
        </Row> */}
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
};

export default BuildStatisticsDataBlockContainer;
