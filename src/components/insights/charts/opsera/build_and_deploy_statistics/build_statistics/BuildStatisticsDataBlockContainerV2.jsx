import React, {useEffect} from "react";
import PropTypes from "prop-types";
// import Model from "core/data_model/model";
// import SonarRatingsBugsActionableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar-ratings-bugs-actionable-metadata";
// import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import SuccessRateDataBlock
  from "components/common/metrics/data_blocks/success/success_rate/SuccessRateDataBlock";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SuccessfulBuildsDataBlock
  from "components/common/metrics/data_blocks/build/successful_builds/SuccessfulBuildsDataBlock";
import FailedBuildsDataBlock
  from "components/common/metrics/data_blocks/build/failed_builds/FailedBuildsDataBlock";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig, getColor, assignStandardColors } from 'components/insights/charts/charts-views';
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: Pass in relevant data and don't use hardcoded data
function BuildStatisticsDataBlockContainer({ metricData, chartData }) {
  // const toastContext = useContext(DialogToastContext);

  // const onRowSelect = () => {
  //   const chartModel = new Model({...SonarRatingsBugsActionableMetadata.newObjectFields}, SonarRatingsBugsActionableMetadata, false);
  //   toastContext.showOverlayPanel(
  //     <ChartDetailsOverlay
  //       dashboardData={dashboardData}
  //       kpiConfiguration={kpiConfiguration}
  //       chartModel={chartModel}
  //       kpiIdentifier={"sonar-ratings-debt-ratio"}
  //     />);
  // };

  let successChartData = [
    {
      "id": "success rate",
      "color": "hsl(2, 54%, 65%)",
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
        bottomText={"Goal: 95%"}
      />
    );
  };

  const getSuccessTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
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
          pointSize={6}
          markers={[
            {
                axis: 'y',
                value: 95,
                lineStyle: { stroke: '#00897b', strokeWidth: 1 },
                legend: 'Goal',
            },
            {
              axis: 'y',
              value: metricData?.build?.successPercent,
              lineStyle: { stroke: '#00897b', strokeWidth: 1 },
              legend: 'Success Rate',
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
      // onClick={() => onRowSelect()}
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
};

export default BuildStatisticsDataBlockContainer;
