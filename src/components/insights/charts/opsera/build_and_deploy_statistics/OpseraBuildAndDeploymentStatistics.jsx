import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import BuildStatisticsDataBlockContainer from "components/insights/charts/opsera/build_and_deploy_statistics/build_statistics/BuildStatisticsDataBlockContainer";
import BuildFrequencyStatisticsDataBlockContainer from "components/insights/charts/opsera/build_and_deploy_statistics/build_frequency_statistics/BuildFrequencyStatisticsDataBlockContainer";
import DeploymentStatisticsDataBlockContainer from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/DeploymentStatisticsDataBlockContainer";
import DeploymentFrequencyStatisticsDataBlockContainer from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_frequency_statistics/DeploymentFrequencyStatisticsDataBlockContainer";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import BuildAndDeployChartHelpDocumentation from "../../../../common/help/documentation/insights/charts/BuildAndDeployChartHelpDocumentation";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  OPSERA_BUILD_DATA_AND_DEPLOYMENT_STATISTICS_CONSTANTS as constants
} from "./OpseraBuildAndDeploymentStatistics_kpi_datapoint_identifiers";

const DEFAULT_GOALS = {
  build_success_rate: 90,
  average_builds: 1,
  deployment_success_rate: 90,
  average_deployments: 1,
};

function OpseraBuildAndDeploymentStatistics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [buildAndDeployMetricData, setBuildAndDeployMetricData] = useState(undefined);
  const [buildAndDeployChartData, setBuildAndDeployChartData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);
  const [buildFrequencyDataPoint, setBuildFrequencyDataPoint] = useState(undefined);
  const [buildStatisticsDataPoint, setBuildStatisticsDataPoint] = useState(undefined);
  const [deploymentFrequencyDataPoint, setDeploymentFrequencyDataPoint] = useState(undefined);
  const [deploymentStatisticsDataPoint, setDeploymentStatisticsDataPoint] = useState(undefined);

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
      await loadDataPoints(cancelSource);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;
      if (goals) {
        setGoalsData(goals);
      } else {
        kpiConfiguration.filters[
          kpiConfiguration.filters.findIndex((obj) => obj.type === "goals")
        ].value = DEFAULT_GOALS;
        setGoalsData(DEFAULT_GOALS);
      }

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "pipelineBuildAndDeploymentStatistics",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );

      const metrics = response?.data?.data[0]?.pipelineBuildAndDeploymentStatistics?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setBuildAndDeployMetricData(metrics[0]?.statisticsData);
        setBuildAndDeployChartData(metrics[0]?.chartData);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const buildFrequencyStatisticsDataPoint = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.BUILD_FREQUENCY_STATISTICS_DATA_POINT);
    setBuildFrequencyDataPoint(buildFrequencyStatisticsDataPoint);
    const buildStatisticsDataPoint1 = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.BUILD_STATISTICS_DATA_POINT);
    setBuildStatisticsDataPoint(buildStatisticsDataPoint1);
    const deploymentFrequencyStatisticsDataPoint = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOYMENT_FREQUENCY_STATISTICS_DATA_POINT);
    setDeploymentFrequencyDataPoint(deploymentFrequencyStatisticsDataPoint);
    const deploymentStatisticsDataPoint1 = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOYMENT_STATISTICS_DATA_POINT);
    setDeploymentStatisticsDataPoint(deploymentStatisticsDataPoint1);
  };

  const getChartBody = () => {
    if (!buildAndDeployMetricData || !buildAndDeployChartData) {
      return null;
    }
    return (
      <Row className={"mx-0 p-2 justify-content-between"}>
        {dataPointHelpers.isDataPointVisible(buildStatisticsDataPoint) &&
        <Col className={"px-0"} xl={6} lg={12}>
          <BuildStatisticsDataBlockContainer
            metricData={buildAndDeployMetricData}
            chartData={buildAndDeployChartData}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            goalsData={goalsData?.build_success_rate}
            dataPoint={buildStatisticsDataPoint}
          />
        </Col> }
        {dataPointHelpers.isDataPointVisible(buildFrequencyDataPoint) &&
        <Col className={"px-0"} xl={6} lg={12}>
          <BuildFrequencyStatisticsDataBlockContainer
            metricData={buildAndDeployMetricData}
            chartData={buildAndDeployChartData}
            goalsData={goalsData?.average_builds}
            kpiConfiguration={kpiConfiguration}
            dataPoint={buildFrequencyDataPoint}
          />
        </Col> }
        {dataPointHelpers.isDataPointVisible(deploymentStatisticsDataPoint) &&
        <Col className={"px-0"} xl={6} lg={12}>
          <DeploymentStatisticsDataBlockContainer
            metricData={buildAndDeployMetricData}
            chartData={buildAndDeployChartData}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            goalsData={goalsData?.deployment_success_rate}
            dataPoint={deploymentStatisticsDataPoint}
          />
        </Col> }
        {dataPointHelpers.isDataPointVisible(deploymentFrequencyDataPoint) &&
        <Col className={"px-0"} xl={6} md={12}>
          <DeploymentFrequencyStatisticsDataBlockContainer
            metricData={buildAndDeployMetricData}
            chartData={buildAndDeployChartData}
            goalsData={goalsData?.average_deployments}
            kpiConfiguration={kpiConfiguration}
            dataPoint={deploymentFrequencyDataPoint}
          />
        </Col> }
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
        chartHelpComponent={(closeHelpPanel) => (
          <BuildAndDeployChartHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
    </div>
  );
}

OpseraBuildAndDeploymentStatistics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default OpseraBuildAndDeploymentStatistics;
