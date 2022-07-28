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
      // let dashboardTags =
      //   dashboardData?.data?.filters[
      //     dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
      //   ]?.value;
      // let dashboardOrgs =
      //   dashboardData?.data?.filters[
      //     dashboardData?.data?.filters.findIndex(
      //       (obj) => obj.type === "organizations",
      //     )
      //   ]?.value;
      let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;
      if (goals) {
        setGoalsData(goals);
      } else {
        kpiConfiguration.filters[
          kpiConfiguration.filters.findIndex((obj) => obj.type === "goals")
        ].value = DEFAULT_GOALS;
        setGoalsData(DEFAULT_GOALS);
      }
      const response = {
        status: 200,
        status_text: "ES Pipeline Summary Query Results",
        message: "ES Query Response from Living Connection",
        data: [
          {
            gitlabDeploymentStatistics: {
              tool: "gitlab",
              data: [
                {
                  statisticsData: {
                    deploy: { count: 1, type: "", perDayAverage: 55,  },
                  },
                  chartData: {
                    deploySuccess: [
                      {
                        x: "2022-07-21",
                        y: 0,
                        range: "2022-07-21 to 2022-07-22",
                        total: 34,
                        success: 45,
                      },
                      {
                        x: "2022-07-22",
                        y: 0,
                        range: "2022-07-22 to 2022-07-23",
                        total: 60,
                        success: 60,
                      },
                      {
                        x: "2022-07-23",
                        y: 0,
                        range: "2022-07-23 to 2022-07-24",
                        total: 60,
                        success: 50,
                      },
                      {
                        x: "2022-07-24",
                        y: 0,
                        range: "2022-07-24 to 2022-07-25",
                        total: 40,
                        success: 34,
                      },
                      {
                        x: "2022-07-25",
                        y: 0,
                        range: "2022-07-25 to 2022-07-26",
                        total: 0,
                        success: 0,
                      },
                      {
                        x: "2022-07-26",
                        y: 0,
                        range: "2022-07-26 to 2022-07-27",
                        total: 0,
                        success: 0,
                      },
                      {
                        x: "2022-07-27",
                        y: 100,
                        range: "2022-07-27 to 2022-07-28",
                        total: 1,
                        success: 1,
                      },
                      {
                        x: "2022-07-28",
                        y: 4,
                        range: "2022-07-28 to 2022-07-29",
                        total: 4,
                        success: 5,
                      },
                    ],
                    avgDeployments: [
                      {
                        x: "2022-07-21",
                        y: 120,
                        range: "2022-07-21 to 2022-07-22",
                        total: 134,
                      },
                      {
                        x: "2022-07-22",
                        y: 120,
                        range: "2022-07-22 to 2022-07-23",
                        total: 220,
                      },
                      {
                        x: "2022-07-23",
                        y: 40,
                        range: "2022-07-23 to 2022-07-24",
                        total: 40,
                      },
                      {
                        x: "2022-07-24",
                        y: 30,
                        range: "2022-07-24 to 2022-07-25",
                        total: 50,
                      },
                      {
                        x: "2022-07-25",
                        y: 40,
                        range: "2022-07-25 to 2022-07-26",
                        total: 60,
                      },
                      {
                        x: "2022-07-26",
                        y: 50,
                        range: "2022-07-26 to 2022-07-27",
                        total: 70,
                      },
                      {
                        x: "2022-07-27",
                        y: 10,
                        range: "2022-07-27 to 2022-07-28",
                        total: 10,
                      },
                      {
                        x: "2022-07-28",
                        y: 0,
                        range: "2022-07-28 to 2022-07-29",
                        total: 0,
                      },
                    ],
                  },
                },
              ],
              length: 1,
              status: 200,
              status_text: "OK",
            },
          },
        ],
      };

      const metrics = response?.data[0]?.gitlabDeploymentStatistics?.data[0];
      console.log(metrics, response, "***");
      // if (isMounted?.current === true && Array.isArray(metrics)) {
      setDeploymentFrequencyMetricData(metrics?.statisticsData);
      setDeploymentFrequencyChartData(metrics?.chartData);
      // }
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
    const buildFrequencyStatisticsDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .BUILD_FREQUENCY_STATISTICS_DATA_POINT,
    );
    console.log(buildFrequencyStatisticsDataPoint, "***** metricData33222");
    setBuildFrequencyDataPoint(buildFrequencyStatisticsDataPoint);
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
