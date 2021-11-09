import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import SuccessfulDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/successful_deployments/SuccessfulDeploymentsDataBlock";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import FailedDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/failed_deployments/FailedDeploymentsDataBlock";
import SuccessRateDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateDataBlock";
import Col from "react-bootstrap/Col";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {  kpiGoalsFilterMetadata  } from "components/insights/marketplace/charts/kpi-configuration-metadata";
import DeploymentStatisticsActionableInsightsTable from "./DeploymentStatisticsActionableInsightsTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentStatisticsDataBlockContainerV2({ metricData, chartData, kpiConfiguration }) {
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
          <DeploymentStatisticsActionableInsightsTable />
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
      "data": chartData?.deploySuccess
    }  
  ];

  const getLeftDataBlock = () => {
    return (
      <SuccessfulDeploymentsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        successfulDeploymentCount={metricData?.deploy?.success || 0}
        // bottomText={"10% increase"}
      />
    );
  };

  const getMiddleDataBlock = () => {
    return (
      <FailedDeploymentsDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        failedDeploymentCount={metricData?.deploy?.failure || 0}
        // bottomText={"20% decrease"}
      />
    );
  };

  const getRightDataBlock = () => {
    return (
      <SuccessRateDataBlock
        qualityLevel={METRIC_QUALITY_LEVELS.DANGER}
        successPercentage={metricData?.deploy?.successPercent || 0}
        bottomText={`Goal: ${kpiGoalsFilter.getData("value").deployment_success_rate}%`}
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
                value: kpiGoalsFilter.getData("value").deployment_success_rate,
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
      title={"Deployment Statistics"}
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

DeploymentStatisticsDataBlockContainerV2.propTypes = {
    metricData: PropTypes.object,
    chartData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
};

export default DeploymentStatisticsDataBlockContainerV2;
