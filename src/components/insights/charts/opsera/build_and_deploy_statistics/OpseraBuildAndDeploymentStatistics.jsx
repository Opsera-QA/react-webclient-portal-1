import React, {useState, useContext, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
// import SonarRatingsChartHelpDocumentation
//   from "components/common/help/documentation/insights/charts/SonarRatingsChartHelpDocumentation";
import DeploymentStatisticsDataBlockContainerV2
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/DeploymentStatisticsDataBlockContainerV2";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import BuildStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_statistics/BuildStatisticsDataBlockContainer";
import BuildStatisticsDataBlockContainerV2
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_statistics/BuildStatisticsDataBlockContainerV2";
import DeploymentFrequencyStatisticsDataBlockContainerV2
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_frequency_statistics/DeploymentFrequencyStatisticsDataBlockContainerV2";
import BuildFrequencyStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_frequency_statistics/BuildFrequencyStatisticsDataBlockContainer";
import BuildFrequencyStatisticsDataBlockContainerV2
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_frequency_statistics/BuildFrequencyStatisticsDataBlockContainerV2";
import AllDeploymentStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/AllDeploymentStatisticsDataBlockContainer";
import AllBuildStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_statistics/AllBuildStatisticsDataBlockContainer";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import { getDateObjectFromKpiConfiguration } from "components/insights/charts/charts-helpers";


function OpseraBuildAndDeploymentStatistics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [buildAndDeployMetricData, setBuildAndDeployMetricData] = useState(undefined);
  const [buildAndDeployChartData, setBuildAndDeployChartData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  // TODO: Wire up data pull and pass relevant data down
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
  
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
  
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);
  
  // TODO: Don't send this complicated object, just send the metric
  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "pipelineBuildAndDeploymentStatistics", kpiConfiguration, dashboardTags);
      
      const metrics = response?.data?.data[0]?.pipelineBuildAndDeploymentStatistics?.data;
  
      if (isMounted?.current === true && Array.isArray(metrics)) {
        setBuildAndDeployMetricData(metrics[0]?.statisticsData);
        setBuildAndDeployChartData(getChartData(metrics[0]?.chartData));
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const monthData = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  const getCorrectedData = (monthArr, ipData) => {
    
    if(!ipData){
      return undefined;
    }

    return monthArr.map(month => ipData.find(d => d.x === month+1) || { x: month+1, y: 0 })
            .map(d => {
              return {
                x: monthData[d.x-1],
                y: d.y
              };
            });


    // return Array.from(Array(12).keys(), month => 
    //   ipData.find(ipd => ipd.x === month+1) || { x: month+1, y: 0 }
    // ).map(d => {
    //   return {
    //     x: monthData[d.x-1],
    //     y: d.y
    //   };
    // });
  };

  const getChartData = (chartData) => {

    if(!chartData){
      return undefined;
    }

    const selectedDate = getDateObjectFromKpiConfiguration(kpiConfiguration);    

    let d = new Date(selectedDate.end);

    let monthArr = [];
    for(let i=0;i<12;i++){
      monthArr.push(d.getMonth());
      d.setMonth(d.getMonth()-1);
    }
    monthArr.reverse();

    return {
      buildSuccess: getCorrectedData(monthArr, chartData?.buildSuccess),
      avgBuilds: getCorrectedData(monthArr, chartData?.avgBuilds),      
      deploySuccess: getCorrectedData(monthArr, chartData?.deploySuccess),
      avgDeployments: getCorrectedData(monthArr, chartData?.avgDeployments)
    };
  };
  

  const getChartBody = () => {    
    return (
      <Row className={"mx-0 p-2 justify-content-between"}>        
        <Col className={"px-0"} xl={6} lg={12}>
          <BuildStatisticsDataBlockContainerV2 metricData={buildAndDeployMetricData} chartData={buildAndDeployChartData} kpiConfiguration={kpiConfiguration} />
        </Col>
        <Col className={"px-0"} xl={6} lg={12}>
          <BuildFrequencyStatisticsDataBlockContainerV2 metricData={buildAndDeployMetricData} chartData={buildAndDeployChartData} kpiConfiguration={kpiConfiguration} />
        </Col>
        <Col className={"px-0"} xl={6} lg={12}>
          <DeploymentStatisticsDataBlockContainerV2 metricData={buildAndDeployMetricData} chartData={buildAndDeployChartData} kpiConfiguration={kpiConfiguration} />
        </Col>
        <Col className={"px-0"} xl={6} md={12}>
          <DeploymentFrequencyStatisticsDataBlockContainerV2 metricData={buildAndDeployMetricData} chartData={buildAndDeployChartData} kpiConfiguration={kpiConfiguration} />
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Build and deploy metrics"}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        // chartHelpComponent={(closeHelpPanel) => <SonarRatingsChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      />
    </div>
  );
}

OpseraBuildAndDeploymentStatistics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraBuildAndDeploymentStatistics;
