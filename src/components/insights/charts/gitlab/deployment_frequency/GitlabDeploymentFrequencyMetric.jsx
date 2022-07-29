import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import BuildAndDeployChartHelpDocumentation from "components/common/help/documentation/insights/charts/BuildAndDeployChartHelpDocumentation";
import { GITLAB_DEPLOYMENT_FREQUENCY_CONSTANTS as constants } from "./GitlabDeploymentFrequency_kpi_datapoint_identifiers";
import GitlabDeploymentFrequencyDataBlockContainer from "./GitlabDeploymentFrequencyDataBlockContainer";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";

const DEFAULT_GOALS = {
  deployment_frequency_rate: 90,
};

function GitlabDeploymentFrequency({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [deploymentFrequencyMetricData, setDeploymentFrequencyMetricData] =
    useState(undefined);
  const [deploymentFrequencyChartData, setDeploymentFrequencyChartData] =
    useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);
  const [deploymentFrequencyDataPoint, setBuildFrequencyDataPoint] =
    useState(undefined);

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
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      let goals =
        kpiConfiguration?.filters[
          kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")
        ]?.value;
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
          "gitlabDeploymentStatistics",
          kpiConfiguration,
          dashboardTags,
          null,
          null,
          dashboardOrgs
      );
      console.log(response, '**** response, api');
      const metrics = response?.data?.data[0]?.gitlabDeploymentStatistics?.data;
      console.log(metrics);
      if (isMounted?.current === true && Array.isArray(metrics)) {
        setDeploymentFrequencyMetricData(metrics[0]?.statisticsData);
        setDeploymentFrequencyChartData(metrics[0]?.chartData);
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
    const dataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .DEPLOYMENT_FREQUENCY_DATA_POINT,
    );
    setBuildFrequencyDataPoint(dataPoint);
  };

  const getChartBody = () => {
    if (!deploymentFrequencyMetricData || !deploymentFrequencyChartData) {
      return null;
    }
    return (
      <Row className={"mx-0 p-2 justify-content-between"}>
        {dataPointHelpers.isDataPointVisible(deploymentFrequencyDataPoint) && (
          <Col
            className={"px-0"}
            xl={12}
            md={12}
          >
            <GitlabDeploymentFrequencyDataBlockContainer
              metricData={deploymentFrequencyMetricData}
              chartData={deploymentFrequencyChartData}
              goalsData={goalsData?.deployment_frequency_rate}
              kpiConfiguration={kpiConfiguration}
              dataPoint={deploymentFrequencyDataPoint}
            />
          </Col>
        )}
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
          <BuildAndDeployChartHelpDocumentation
            closeHelpPanel={closeHelpPanel}
          />
        )}
      />
    </div>
  );
}

GitlabDeploymentFrequency.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitlabDeploymentFrequency;
