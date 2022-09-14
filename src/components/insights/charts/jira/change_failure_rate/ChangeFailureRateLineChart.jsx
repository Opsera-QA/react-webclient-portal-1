// Analytics Software Development Tab, Developer, Node Ticket AN-153
import PropTypes from "prop-types";
// import { ResponsiveLine } from "@nivo/line";
// import config from "./jiraIssuesCreatedVsResolvedLineChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CHANGE_FAILURE_RATE_CONSTANTS as constants } from "./ChangeFailureRate_kpi_datapoint_identifiers";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
// import { defaultConfig, getColor, assignIssueColors } from "../../../charts-views";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import ChangeFailureRateDataBlockContainer from "./ChangeFailureRateDataBlockContainer";

function ChangeFailureRateLineChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);

  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [changeFailureRateDataPoint, setChangeFailureRateDataPoint] =
  useState(undefined);

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const dataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .CHANGE_FAILURE_RATE_DATA_POINT,
    );
    setChangeFailureRateDataPoint(dataPoint);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadDataPoints(cancelSource);
      const response = {
        status: 200,
        status_text: "ES Pipeline Summary Query Results",
        message: "ES Query Response from Living Connection",
        data: [
          {
            jiraChangeFailureRateLineChart: {
              tool: "jira",
              data: [
                {
                  statisticsData: {
                    count: 77,
                    type: "",
                    averageDeployment: 1,
                    prevDeployment: 0,
                    prevDeploymentTrend: {
                      trend: "green",
                    },
                  },
                  chartData: {
                    avgDeployments: [
                      {
                        x: "2022-06-15",
                        y: 0,
                        range: "2022-06-15 to 2022-06-19",
                        total: 0,
                      },
                      {
                        x: "2022-06-19",
                        y: 0,
                        range: "2022-06-19 to 2022-06-26",
                        total: 0,
                      },
                      {
                        x: "2022-06-26",
                        y: 0,
                        range: "2022-06-26 to 2022-07-03",
                        total: 0,
                      },
                      {
                        x: "2022-07-03",
                        y: 0,
                        range: "2022-07-03 to 2022-07-10",
                        total: 0,
                      },
                      {
                        x: "2022-07-10",
                        y: 0,
                        range: "2022-07-10 to 2022-07-17",
                        total: 0,
                      },
                      {
                        x: "2022-07-17",
                        y: 0,
                        range: "2022-07-17 to 2022-07-24",
                        total: 0,
                      },
                      {
                        x: "2022-07-24",
                        y: 1.14,
                        range: "2022-07-24 to 2022-07-31",
                        total: 8,
                      },
                      {
                        x: "2022-07-31",
                        y: 1,
                        range: "2022-07-31 to 2022-08-07",
                        total: 7,
                      },
                      {
                        x: "2022-08-07",
                        y: 1,
                        range: "2022-08-07 to 2022-08-14",
                        total: 7,
                      },
                      {
                        x: "2022-08-14",
                        y: 0.29,
                        range: "2022-08-14 to 2022-08-21",
                        total: 2,
                      },
                      {
                        x: "2022-08-21",
                        y: 1.43,
                        range: "2022-08-21 to 2022-08-28",
                        total: 10,
                      },
                      {
                        x: "2022-08-28",
                        y: 4.29,
                        range: "2022-08-28 to 2022-09-04",
                        total: 30,
                      },
                      {
                        x: "2022-09-04",
                        y: 1.86,
                        range: "2022-09-04 to 2022-09-11",
                        total: 13,
                      },
                      {
                        x: "2022-09-11",
                        y: 0,
                        range: "2022-09-11 to 2022-09-14",
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

      const dataObject =
        response?.data && response?.status === 200
          ? response?.data[0]?.jiraChangeFailureRateLineChart?.data
          : [];
      //   assignIssueColors(dataObject);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject[0].statisticsData);
        setChartData(dataObject[0].chartData);
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

  const getChartBody = () => {
    if (!metrics || !metrics) {
      return null;
    }
    return (
      <Row className={"mx-0 p-2 justify-content-between"}>
        {dataPointHelpers.isDataPointVisible(changeFailureRateDataPoint) && (
          <Col
            className={"px-0"}
            xl={12}
            md={12}
          >
            <ChangeFailureRateDataBlockContainer
              metricData={metrics}
              chartData={chartData}
              goalsData={12}
              kpiConfiguration={kpiConfiguration}
              dataPoint={changeFailureRateDataPoint}
            />
          </Col>)}
      </Row>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
      <ModalLogs
        header="Issues Created vs. Resolved"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

ChangeFailureRateLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ChangeFailureRateLineChart;
