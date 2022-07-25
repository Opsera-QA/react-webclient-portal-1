import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { config, config2 } from "./BoomiBarChartConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import BoomiActionableInsightOverlay from "./actionable_insights/BoomiActionableInsightOverlay";
import { BOOMI_CONSTANTS as dataPointConstants } from "./Boomi_datapoint_identifiers";

import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers.js";
import DataPointVisibilityWrapper from "components/common/metrics/data_points/DataPointVisibilityWrapper.jsx";
import ChartTooltip from "../../ChartTooltip.jsx";
import {
  adjustBarWidth,
  assignStandardColors,
  defaultConfig,
  spaceOutServiceNowCountBySeverityLegend,
} from "../../charts-views.js";
import BoomiSuccessPercentageDataBlock from "../data_blocks/BoomiSuccessPercentageDataBlock.jsx";
import BoomiTotalExecutionsDataBlock from "../data_blocks/BoomiTotalExecutionsDataBlock.jsx";
import BoomiAverageDurationDataBlock from "../data_blocks/BoomiAverageDurationDataBlock.jsx";
import BookiFrequencyDataBlock from "../data_blocks/BookiFrequencyDataBlock.jsx";
import { DialogToastContext } from "contexts/DialogToastContext.js";
import { ResponsiveLine } from "@nivo/line";

function BoomiBarChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
}) {
  const { getAccessToken } = useContext(AuthContext);
  // const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [sevMetrics, setSevMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [overallMean, setOverallMean] = useState(undefined);
  const [minMTTR, setMinMTTR] = useState(undefined);
  const [maxMTTR, setMaxMTTR] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [totalResolvedIncidents, setTotalResolvedIncidents] = useState(0);
  const [lastFiveDays, setLastFiveDays] = useState(0);
  const [fiveToFifteenDays, setFiveToFifteenDays] = useState(0);
  const [fifteenToThirtyDays, setFifteenToThirtyDays] = useState(0);
  const [beforeThirtyDays, setBeforeThirtyDays] = useState(0);
  const [priorityOne, setPriorityOne] = useState(0);
  const [priorityTwo, setPriorityTwo] = useState(0);
  const [priorityThree, setPriorityThree] = useState(0);
  const [priorityFour, setPriorityFour] = useState(0);
  const [priorityFive, setPriorityFive] = useState(0);
  const toastContext = useContext(DialogToastContext);
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
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      const dashboardTags =
          dashboardData?.data?.filters[
            dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
          ]?.value,
        goals =
          kpiConfiguration?.filters[
            kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")
          ]?.value,
        response = {
          data: {
            data: [
              {
                boomi: {
                  tool: "Boomi",
                  data: [
                    {
                      totalResolvedIncidents: 35,
                      minMTTR: 0.04,
                      maxMTTR: 309.78,
                      overallMttrHours: 28.02,
                      docs: [
                        {
                          id: "Success",
                          color: "#28B463",
                          data: [
                            {
                              x: "2022-04-19",
                              y: 4,
                            },
                            {
                              x: "2022-04-20",
                              y: 25,
                            },
                            {
                              x: "2022-04-21",
                              y: 4,
                            },
                            {
                              x: "2022-04-22",
                              y: 3,
                            },
                            {
                              x: "2022-04-23",
                              y: 0,
                            },
                            {
                              x: "2022-04-24",
                              y: 0,
                            },
                            {
                              x: "2022-04-25",
                              y: 1,
                            },
                            {
                              x: "2022-04-26",
                              y: 20,
                            },
                            {
                              x: "2022-04-27",
                              y: 30,
                            },
                            {
                              x: "2022-04-28",
                              y: 20,
                            },
                          ],
                        },
                        {
                          id: "Failure",
                          color: "#CB4335",
                          data: [
                            {
                              x: "2022-04-19",
                              y: 0,
                            },
                            {
                              x: "2022-04-20",
                              y: 12,
                            },
                            {
                              x: "2022-04-21",
                              y: 5,
                            },
                            {
                              x: "2022-04-22",
                              y: 0,
                            },
                            {
                              x: "2022-04-23",
                              y: 0,
                            },
                            {
                              x: "2022-04-24",
                              y: 0,
                            },
                            {
                              x: "2022-04-25",
                              y: 0,
                            },
                            {
                              x: "2022-04-26",
                              y: 4,
                            },
                            {
                              x: "2022-04-27",
                              y: 9,
                            },
                            {
                              x: "2022-04-28",
                              y: 0,
                            },
                          ],
                        },
                      ],
                      totalIncidents: 50,
                      lastFiveDays: 0,
                      fiveToFifteenDays: 0,
                      fifteenToThirtyDays: 0,
                      beforeThirtyDays: 15,
                      "Priority-1": 6,
                      "Priority-2": 3,
                      "Priority-3": 4,
                      "Priority-4": 2,
                      "Priority-5": 20,
                      severityData: [
                        {
                          priority: 1,
                          "Create Package": 4,
                          "Migrate Package": 41,
                          "Deploy Package": 32,
                        },
                        {
                          priority: 2,
                          "Create Package": 25,
                          "Migrate Package": 41,
                          "Deploy Package": 32,
                        },
                        {
                          priority: 3,
                          "Create Package": 4,
                          "Migrate Package": 41,
                          "Deploy Package": 32,
                        },
                        {
                          priority: 4,
                          "Create Package": 3,
                          "Migrate Package": 41,
                          "Deploy Package": 32,
                        },
                        {
                          priority: 5,
                          "Create Package": 10,
                          "Migrate Package": 21,
                          "Deploy Package": 2,
                        },
                      ],
                    },
                  ],
                  length: 1,
                  status: 200,
                  status_text: "OK",
                },
              },
            ],
          },
        },
        dataObject = response?.data?.data[0]?.boomi?.data[0]?.docs,
        barchart = response?.data?.data[0]?.boomi?.data[0]?.severityData,
        overallMeanValue =
          response?.data?.data[0]?.boomi?.data[0]?.overallMttrHours;

      setGoalsData(goals);
      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.totalIncidents));
      }
      spaceOutServiceNowCountBySeverityLegend(barchart);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setSevMetrics(barchart);
        setOverallMean(overallMeanValue);
      }

      if (!dataObject) {
        setMetrics([]);
        setSevMetrics([]);
      }
      const responseData = response?.data?.data[0]?.boomi?.data[0];
      setTotalIncidents(
        responseData?.totalIncidents ? responseData?.totalIncidents : 0,
      );
      setTotalResolvedIncidents(
        responseData?.totalResolvedIncidents
          ? responseData?.totalResolvedIncidents
          : 0,
      );
      setMinMTTR(responseData?.minMTTR ? responseData?.minMTTR : 0);
      setMaxMTTR(responseData?.maxMTTR ? responseData?.maxMTTR : 0);
      setLastFiveDays(
        responseData?.lastFiveDays ? responseData?.lastFiveDays : 0,
      );
      setFiveToFifteenDays(
        responseData?.fiveToFifteenDays ? responseData?.fiveToFifteenDays : 0,
      );
      setFifteenToThirtyDays(
        responseData?.fifteenToThirtyDays
          ? responseData?.fifteenToThirtyDays
          : 0,
      );
      setBeforeThirtyDays(
        responseData?.beforeThirtyDays ? responseData?.beforeThirtyDays : 0,
      );
      if (responseData) {
        setPriorityOne(responseData["Priority-1"] || 0);
        setPriorityTwo(responseData["Priority-2"] || 0);
        setPriorityThree(responseData["Priority-3"] || 0);
        setPriorityFour(responseData["Priority-4"] || 0);
        setPriorityFive(responseData["Priority-5"] || 0);
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

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <BoomiActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />,
    );
  };

  
  const getMetricTopRow = () => {
    return (
      <Row>
        <Col
          xl={2}
          lg={2}
          md={2}
        >
          <MetricBadgeBase
            className={"mr-3"}
            badgeText={`Aging of unresolved tickets:`}
          />
        </Col>
        <Col
          xl={2}
          lg={4}
          md={2}
        >
          <MetricBadgeBase
            className={"mr-3"}
            badgeText={`Last Five Days: ${lastFiveDays}`}
          />
        </Col>
        <Col
          xl={2}
          lg={2}
          md={2}
        >
          <MetricBadgeBase
            className={"mr-3"}
            badgeText={`5-15 days: ${fiveToFifteenDays}`}
          />
        </Col>
        <Col
          xl={2}
          lg={2}
          md={2}
        >
          <MetricBadgeBase
            className={"mr-3"}
            badgeText={`15-30 days: ${fifteenToThirtyDays}`}
          />
        </Col>
        <Col
          xl={2}
          lg={2}
          md={2}
        >
          <MetricBadgeBase
            className={"mr-3"}
            badgeText={`> 30 Days: ${beforeThirtyDays}`}
          />
        </Col>
      </Row>
    );
  };
  console.log(sevMetrics, "***ResponsiveBar");
  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    const dataPoints = kpiConfiguration?.dataPoints;
    const boomiFrequencyPercentageDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BOOMI_SUCCESS_PERCENTAGE_DATA_POINT,
    );
    
    const boomiSuccessPercentageDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .BOOMI_SUCCESS_PERCENTAGE_DATA_POINT,
    );

    
    return (
      <>
        <div
          className={"chart-footer-text"}
          style={{ marginTop: "10px" }}
        >
          <MetricBadgeBase
            className={"mx-2"}
            badgeText={"Chart depicts recent 15 results"}
          />
        </div>
        <div
          className="new-chart m-3"
          style={{ minHeight: "450px" }}
        >
          <Row>
            <Col
              md={3}
              className="h-100 p-3"
            >
              <DataPointVisibilityWrapper dataPoint={boomiSuccessPercentageDataPoint} >
                <BoomiSuccessPercentageDataBlock
                  data={overallMean}
                  dataPoint={boomiSuccessPercentageDataPoint}
                />
              </DataPointVisibilityWrapper>
            </Col>
            <Col
              md={3}
              className="h-100 p-3"
            >
                <BoomiTotalExecutionsDataBlock data={minMTTR} />
            </Col>
            <Col
              md={3}
              className="h-100 p-3"
            >
              <DataPointVisibilityWrapper dataPoint={boomiFrequencyPercentageDataPoint} >
                <BookiFrequencyDataBlock data={totalIncidents} 
                  dataPoint={boomiFrequencyPercentageDataPoint}
                />
              </DataPointVisibilityWrapper>
            </Col>
            <Col
              md={3}
              className="h-100 p-3"
            >
              <BoomiAverageDurationDataBlock data={maxMTTR} />
            </Col>
          </Row>
          <Row>
            {/* {dataPointHelpers.isDataPointVisible(mttrChartDataPoint) && ( */}
            <Col
              md={6}
              sm={12}
              lg={6}
            >
              <div
                className="chart mb-3"
                style={{ height: "300px" }}
              >
                <ResponsiveLine
                  data={metrics}
                  {...defaultConfig(
                    "Number of incidents",
                    "Date",
                    false,
                    false,
                    "wholeNumbers",
                    "monthDate2",
                  )}
                  {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
                  {...adjustBarWidth(metrics)}
                  // onClick={(data) => onRowSelect(data)}
                  tooltip={({ indexValue, value, data, color }) => (
                    <ChartTooltip
                      titles={[
                        "Date",
                        "Mean Time to Resolution",
                        "Number of Incidents",
                      ]}
                      values={[
                        new Date(indexValue).toDateString(),
                        `${value} hours`,
                        data.Count,
                      ]}
                      style={false}
                      // color={color}
                    />
                  )}
                  markers={[]}
                />
              </div>
            </Col>
            {/* )} */}
            {/* {dataPointHelpers.isDataPointVisible(
                numberOfIncidentsDataPoint,
              ) && ( */}
            <Col
              md={6}
              sm={12}
              lg={6}
            >
              <div
                className="chart mb-3"
                style={{ height: "300px" }}
              >
                <ResponsiveBar
                  data={sevMetrics}
                  {...defaultConfig(
                    "Number of Incidents",
                    "Severity",
                    false,
                    false,
                    "wholeNumbers",
                  )}
                  {...config2(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
                  {...adjustBarWidth(sevMetrics)}
                  // onClick={(data) => onRowSelect(data)}
                  // tooltip={({ indexValue, value }) => (
                  //   <ChartTooltip
                  //     titles={["Severity", "Number of Incidents"]}
                  //     values={[indexValue, `${value}`]}
                  //     style={false}
                  //     // color={color}
                  //   />
                  // )}
                />
              </div>
            </Col>
            {/* // )} */}
          </Row>
        </div>
        <div className="ml-2 p-0">{getMetricTopRow()}</div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
        launchActionableInsightsFunction={onRowSelect}
      />
      <ModalLogs
        header="Mean Time to Resolution"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

BoomiBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  bars: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
  showSettingsToggle: PropTypes.bool,
};

export default BoomiBarChart;
