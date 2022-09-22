import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import { GITLAB_DEPLOYMENT_FREQUENCY_CONSTANTS as constants } from "./GitlabDeploymentFrequency_kpi_datapoint_identifiers";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import GitlabDeployFrequencyChartHelpDocumentation from "../../../../common/help/documentation/insights/charts/GitlabDeployFrequencyChartHelpDocumentation";
import GitlabDeploymentFrequencyDataBlock from "./GitlabDeploymentFrequencyDataBlock";
import {getDeploymentStageFromKpiConfiguration, getTrend, getReverseIcon} from "../../charts-helpers";
import GitlabDeploymentFrequencyRecentStagesDataBlock from "./GitlabDeploymentFrequencyRecentStagesDataBlock";
import GitlabDeploymentFrequencyLineChartContainer from "./GitlabDeploymentFrequencyLineChartContainer";
import GitlabDeploymentFrequencyTrendDataBlock from "./GitlabDeploymentFrequencyTrendDataBlock";

function GitlabDeploymentFrequency({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] =
    useState(undefined);
  const [chartData, setChartData] =
    useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [deploymentFrequencyDataPoint, setBuildFrequencyDataPoint] =
    useState(undefined);

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

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabDeploymentStatistics",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs,
      );
      const metrics = response?.data?.data[0]?.gitlabDeploymentStatistics?.data;
      if (isMounted?.current === true && Array.isArray(metrics)) {
        setMetricData(metrics[0]?.statisticsData);
        setChartData(metrics[0]?.chartData);
      } else {
        setMetricData({});
        setChartData([]);
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
    if (
      !metricData?.step?.total ||
      !chartData?.step?.length
    ) {
      return null;
    }
    const recentStageDate = new Date(metricData?.step?.stepFinishedAt).toLocaleDateString();
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration);
    return (
      <div
        className="new-chart m-3 p-0"
        style={{ minHeight: "450px", display: "flex" }}
      >
        <Row className={"w-100"}>
          <Row
            xl={6}
            lg={6}
            md={7}
            className={"mb-2 d-flex justify-content-center"}
          >
            <Col
              md={12}
              className={"mx-2"}
            >
              <GitlabDeploymentFrequencyDataBlock
                value={selectedDeploymentStages?.length || 0}
                prevValue={""}
                topText={"Selected Stage(s)"}
                bottomText={""}
              />
            </Col>
            <Col md={12}>
              <GitlabDeploymentFrequencyTrendDataBlock
                value={metricData?.step?.averageStepRuns}
                prevValue={
                  metricData?.step?.previousAverageStepRuns
                }
                dataPoint={deploymentFrequencyDataPoint}
                trend={getTrend(metricData?.step?.averageStepRuns,
                  metricData?.step?.previousAverageStepRuns)}
                getReverseIcon={getReverseIcon}
                topText={"Average Deployment Frequency"}
                bottomText={"Prev Average: "}
              />
            </Col>
            <Col md={12}>
              <GitlabDeploymentFrequencyDataBlock
                value={metricData?.pipeline?.totalSuccess}
                prevValue={
                  metricData?.pipeline?.previousTotalSuccess
                }
                topText={"Total Pipelines"}
                bottomText={"Prev Runs: "}
              />
            </Col>
            <Col md={12}>
              <GitlabDeploymentFrequencyDataBlock
                value={metricData?.step?.totalSuccess}
                prevValue={
                  metricData?.step?.previousTotalSuccess
                }
                topText={"Total Stages Run"}
                bottomText={"Prev Runs: "}
              />
            </Col>
            <Col md={12}>
              <GitlabDeploymentFrequencyRecentStagesDataBlock
                stage={metricData?.step?.stepType}
                date={recentStageDate}
                topText={"Recent Stage"}
                bottomText={"Date: "}
              />
            </Col>
          </Row>
          <Col className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GitlabDeploymentFrequencyLineChartContainer
              chartData={chartData}
            />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Deploy metrics"}
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
          <GitlabDeployFrequencyChartHelpDocumentation
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
