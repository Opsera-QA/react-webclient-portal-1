import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./JiraMeanTimeToResolutionConfigs.js";
import config2 from "./JiraSeverityCountConfig.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig,
  getColorByData,
  assignStandardColors,
  adjustBarWidth,
  spaceOutServiceNowCountBySeverityLegend,
} from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import { dataPointHelpers } from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import { JIRA_MEAN_TIME_TO_RESOLUTION_CONSTANTS as dataPointConstants } from "./JiraMeanTimeToResolution_datapoint_identifiers";
import DataPointVisibilityWrapper from "../../../../../common/metrics/data_points/DataPointVisibilityWrapper";
import jiraAction from "../../jira.action";
import JiraMTTRDataBlock from "../../data_blocks/JiraMTTRDataBlock";
import JiraMTTRChartHelpDocumentation
  from "../../../../../common/help/documentation/insights/charts/JiraMTTRChartHelpDocumentation";
import {getReverseTrend, getReverseTrendIcon, getTrend, getTrendIcon} from "../../../charts-helpers";

function JiraMeanTimeToResolutionBarChart({
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
  const [dataBlock, setDataBlock] = useState({});
  const [goalsData, setGoalsData] = useState(undefined);
  const [lastFiveDays, setLastFiveDays] = useState(0);
  const [fiveToFifteenDays, setFiveToFifteenDays] = useState(0);
  const [fifteenToThirtyDays, setFifteenToThirtyDays] = useState(0);
  const [beforeThirtyDays, setBeforeThirtyDays] = useState(0);
  // const [priorityOne, setPriorityOne] = useState(0);
  // const [priorityTwo, setPriorityTwo] = useState(0);
  // const [priorityThree, setPriorityThree] = useState(0);
  // const [priorityFour, setPriorityFour] = useState(0);
  // const [priorityFive, setPriorityFive] = useState(0);
  // const toastContext = useContext(DialogToastContext);
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
  }, []);

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
        response = await jiraAction.getJiraMTTR(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
        );
      const dataObject = response?.data?.data?.jiraMTTR?.data?.docs,
        barchart = response?.data?.data?.jiraMTTR?.data?.severityData;

      setGoalsData(goals);
      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }
      spaceOutServiceNowCountBySeverityLegend(barchart);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setSevMetrics(barchart);
      }

      if (!dataObject) {
        setMetrics([]);
        setSevMetrics([]);
      }
      const responseData = response?.data?.data?.jiraMTTR?.data;
      setDataBlock(responseData);
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
      // THIS IS USED WHEN ACTIONABLE INSIGHTS ARE DEVELOPED
      // if (responseData) {
      //   setPriorityOne(responseData["Blocker"] || 0);
      //   setPriorityTwo(responseData["Highest"] || 0);
      //   setPriorityThree(responseData["High"] || 0);
      //   setPriorityFour(responseData["Medium"] || 0);
      //   setPriorityFive(responseData["Low"] || 0);
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

  // const onRowSelect = () => {
  //   toastContext.showOverlayPanel(
  //     <MTTRActionableInsightOverlay
  //       kpiConfiguration={kpiConfiguration}
  //       dashboardData={dashboardData}
  //     />
  //   );
  // };

  // const getMetricBottomRow = () => {
  //   return (
  //     <Row>
  //       <Col
  //         xl={2}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`Resolved Tickets by Severity:`}
  //         />
  //       </Col>
  {/*      <Col*/}
  //         xl={2}
  //         lg={4}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`Sev-1: ${priorityOne}`}
  //         />
  {/*      </Col>*/}
  {/*      <Col*/}
  {/*        xl={2}*/}
  {/*        lg={2}*/}
  {/*        md={2}*/}
  {/*      >*/}
  {/*        <MetricBadgeBase*/}
  //           className={"mr-3"}
  //           badgeText={`Sev-2: ${priorityTwo}`}
  //         />
  //       </Col>
  {/*      <Col*/}
  //         xl={2}
  //         lg={2}
  //         md={2}
  {/*      >*/}
  {/*        <MetricBadgeBase*/}
  //           className={"mr-3"}
  //           badgeText={`Sev-3: ${priorityThree}`}
  {/*        />*/}
  {/*      </Col>*/}
  {/*      <Col*/}
  {/*        xl={2}*/}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`Sev-4: ${priorityFour}`}
  //         />
  //       </Col>
  //       <Col
  //         xl={2}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`Sev-5: ${priorityFive}`}
  //         />
  //       </Col>
  //     </Row>
  //   );
  // };
  // Todo Aruna wanted to revisit this formula and this can be delivered during insights.
  // const getMetricTopRow = () => {
  //   return (
  //     <Row>
  //       <Col
  //         xl={2}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`Aging of unresolved tickets:`}
  //         />
  //       </Col>
  //       <Col
  //         xl={2}
  //         lg={4}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`Last Five Days: ${lastFiveDays}`}
  //         />
  //       </Col>
  //       <Col
  //         xl={2}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`5-15 days: ${fiveToFifteenDays}`}
  //         />
  //       </Col>
  //       <Col
  //         xl={2}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`15-30 days: ${fifteenToThirtyDays}`}
  //         />
  //       </Col>
  //       <Col
  //         xl={2}
  //         lg={2}
  //         md={2}
  //       >
  //         <MetricBadgeBase
  //           className={"mr-3"}
  //           badgeText={`> 30 Days: ${beforeThirtyDays}`}
  //         />
  //       </Col>
  //     </Row>
  //   );
  // };

  const getChartBody = () => {
    if (
      !Array.isArray(metrics) ||
      !Array.isArray(sevMetrics) ||
      metrics.length === 0 ||
      sevMetrics.length === 0 ||
      !dataBlock?.totalIncidents
    ) {
      return null;
    }

    const dataPoints = kpiConfiguration?.dataPoints;
    const mttrChartDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.MTTR_DATA_POINT,
    );
    const numberOfIncidentsDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .NUMBER_OF_INCIDENTS_DATA_POINT,
    );
    const averageMTTRDataBlockDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .AVERAGE_MTTR_DATA_BLOCK_DATA_POINT,
    );
    const isOneChartVisible =
      dataPointHelpers.isDataPointVisible(mttrChartDataPoint) ||
      dataPointHelpers.isDataPointVisible(numberOfIncidentsDataPoint);
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
          className="new-chart m-3 p-0"
          style={
            isOneChartVisible
              ? { minHeight: "450px", display: "flex" }
              : { display: "flex" }
          }
        >
          <Row>
            <Row
              xl={6}
              lg={6}
              md={7}
              className={"mb-3 d-flex justify-content-center"}
            >
              <Col md={12}>
                <JiraMTTRDataBlock
                  incidents={dataBlock.totalIncidents}
                  prevIncidents={dataBlock.previousTotalIncidents}
                  dataPoint={numberOfIncidentsDataPoint}
                  trend={getReverseTrend(dataBlock.totalIncidents,dataBlock.previousTotalIncidents)}
                  getIcon = {getReverseTrendIcon}
                  topText={"Total Incidents"}
                  bottomText={"Prev Total Incidents"}
                />
              </Col>
              <Col md={12}>
                <JiraMTTRDataBlock
                  incidents={dataBlock.totalResolvedIncidents}
                  prevIncidents={dataBlock.previousTotalResolvedIncidents}
                  dataPoint={numberOfIncidentsDataPoint}
                  trend={getTrend(dataBlock.totalResolvedIncidents,dataBlock.previousTotalResolvedIncidents)}
                  getIcon = {getTrendIcon}
                  topText={"Resolved Incidents"}
                  bottomText={"Prev Resolved Incidents"}
                />
              </Col>
              <DataPointVisibilityWrapper
                dataPoint={averageMTTRDataBlockDataPoint}
              >
                <Col md={12}>
                  <JiraMTTRDataBlock
                    incidents={dataBlock.overallMttrHours}
                    prevIncidents={dataBlock.previousOverallMttrHours}
                    dataPoint={numberOfIncidentsDataPoint}
                    trend={getReverseTrend(dataBlock.overallMttrHours,dataBlock.previousOverallMttrHours)}
                    getIcon = {getReverseTrendIcon}
                    topText={"Average MTTR (Hours)"}
                    bottomText={"Prev Average MTTR"}
                  />
                </Col>
              </DataPointVisibilityWrapper>
              <Col md={12}>
                <JiraMTTRDataBlock
                  incidents={dataBlock.minMTTR}
                  prevIncidents={dataBlock.previousMinMTTR}
                  dataPoint={numberOfIncidentsDataPoint}
                  trend={getReverseTrend(dataBlock.minMTTR,dataBlock.previousMinMTTR)}
                  getIcon = {getReverseTrendIcon}
                  topText={"Min MTTR (Hours)"}
                  bottomText={"Prev Min MTTR"}
                />
              </Col>
              <Col md={12}>
                <JiraMTTRDataBlock
                  incidents={dataBlock.maxMTTR}
                  prevIncidents={dataBlock.previousMaxMTTR}
                  dataPoint={numberOfIncidentsDataPoint}
                  trend={getReverseTrend(dataBlock.maxMTTR,dataBlock.previousMaxMTTR)}
                  getIcon = {getReverseTrendIcon}
                  topText={"Max MTTR (Hours)"}
                  bottomText={"Prev Max MTTR"}
                />
              </Col>
            </Row>
            {dataPointHelpers.isDataPointVisible(mttrChartDataPoint) && (
              <Col
                xl={6}
                lg={6}
                md={3}
                className={"my-2 p-0 d-flex flex-column align-items-end"}
              >
                <ResponsiveBar
                  data={metrics}
                  {...defaultConfig(
                    "Mean Time to Resolution (in hours)",
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
              </Col>
            )}
            {dataPointHelpers.isDataPointVisible(
              numberOfIncidentsDataPoint,
            ) && (
              <Col
                xl={6}
                lg={6}
                md={3}
                className={"my-2 p-0 d-flex flex-column align-items-end"}
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
                  tooltip={({ indexValue, value }) => (
                    <ChartTooltip
                      titles={["Priority", "Number of Incidents"]}
                      values={[indexValue, `${value}`]}
                      style={false}
                      // color={color}
                    />
                  )}
                />
              </Col>
            )}
          </Row>
        </div>
        {/*<div className="ml-2 p-0">{getMetricTopRow()}</div>*/}
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
        chartHelpComponent={(closeHelpPanel) => <JiraMTTRChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
        // launchActionableInsightsFunction={onRowSelect}
        isBeta={true}
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

JiraMeanTimeToResolutionBarChart.propTypes = {
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

export default JiraMeanTimeToResolutionBarChart;
