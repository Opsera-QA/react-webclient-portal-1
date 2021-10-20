import React, {useEffect} from "react";
import PropTypes from "prop-types";
// import Model from "core/data_model/model";
// import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
// import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import SuccessfulDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/successful_deployments/SuccessfulDeploymentsDataBlock";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import FailedDeploymentsDataBlock
  from "components/common/metrics/data_blocks/deployment/failed_deployments/FailedDeploymentsDataBlock";
import SuccessRateDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateDataBlock";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: Pass in relevant data and don't use hardcoded data
function DeploymentStatisticsDataBlockContainerV2({ metricData, chartData }) {
//   const toastContext = useContext(DialogToastContext);

//   const onRowSelect = () => {
//     const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
//     toastContext.showOverlayPanel(
//       <ChartDetailsOverlay
//         dashboardData={dashboardData}
//         kpiConfiguration={kpiConfiguration}
//         chartModel={chartModel}
//         kpiIdentifier={"sonar-ratings-debt-ratio"}
//       />);
//   };


  let successChartData = [
    {
      "id": "success rate",
      "color": "hsl(2, 54%, 65%)",
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
        bottomText={"Goal: 95%"}
      />
    );
  };

  const getSuccessTrendChart = () => {
    return(
      <div className="new-chart mb-3" style={{height: "160px"}}>
        <ResponsiveLine
          data={successChartData}
          {...defaultConfig("", "", 
                false, false, "wholeNumbers", "string")}
          yScale={{ type: 'linear', min: '0', max: '100', stacked: false, reverse: false }}          
          enableGridX={false}
          enableGridY={false}
          axisLeft={{            
            tickValues: [0, 50, 100]
          }}
          // axisLeft={null}
          colors={getColor}         
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
      // onClick={() => onRowSelect()}
    >
      <Col sm={4} className={"p-2"}>
        {getRightDataBlock()}
        <hr/>
        <Row>
          <Col sm={6} className={"p-2"}>
            {getLeftDataBlock()}
          </Col>
          <Col sm={6} className={"p-2"}>
            {getMiddleDataBlock()}
          </Col>
        </Row>
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
};

export default DeploymentStatisticsDataBlockContainerV2;
