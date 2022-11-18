import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./JiraMeanTimeToResolutionConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig,
  assignStandardColors,
  spaceOutServiceNowCountBySeverityLegend,
} from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import { dataPointHelpers } from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import { JIRA_MEAN_TIME_TO_RESOLUTION_CONSTANTS as constants } from "./JiraMeanTimeToResolutionConstants";
import DataPointVisibilityWrapper from "../../../../../common/metrics/data_points/DataPointVisibilityWrapper";
import jiraAction from "../../jira.action";
import JiraMTTRDataBlock from "../../data_blocks/JiraMTTRDataBlock";
import JiraMTTRChartHelpDocumentation from "../../../../../common/help/documentation/insights/charts/JiraMTTRChartHelpDocumentation";
import {
  getMaturityColorClass,
  getMaturityScoreText,
  getReverseTrend,
  getReverseTrendIcon,
  getTrend,
  getTrendIcon
} from "../../../charts-helpers";
import BadgeBase from "../../../../../common/badges/BadgeBase";
import JiraMeanTimeToResolutionMaturityBlock from "./JiraMeanTimeToResolutionMaturityBlock";
import {DialogToastContext} from "contexts/DialogToastContext";
import JiraMeanTimeToResolutionSeverityChartPanel from './JiraMeanTimeToResolutionSeverityChartPanel';

function JiraMeanTimeToResolutionChart({
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
  // const [priorityOne, setPriorityOne] = useState(0);
  // const [priorityTwo, setPriorityTwo] = useState(0);
  // const [priorityThree, setPriorityThree] = useState(0);
  // const [priorityFour, setPriorityFour] = useState(0);
  // const [priorityFive, setPriorityFive] = useState(0);
  // const toastContext = useContext(DialogToastContext);
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
          ]?.value;
      const response = await jiraAction.getJiraMTTR(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
        );
      const responseData = response?.data;

      setDataBlock(responseData);

      const dataObject = responseData?.docs;
      const barchart = responseData?.severityData;

      assignStandardColors(dataObject, true);

      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setSevMetrics(barchart);
      }

      if (!dataObject) {
        setMetrics([]);
        setSevMetrics([]);
      }

      spaceOutServiceNowCountBySeverityLegend(barchart);
      
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

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const openPanel = () => {
    toastContext.showOverlayPanel(<JiraMeanTimeToResolutionSeverityChartPanel severityChartData={sevMetrics} closePanel={closePanel} />);
  };

  const getChartBody = () => {
    if (
      !metrics ||
      !Array.isArray(metrics) ||
      !Array.isArray(sevMetrics) ||
      sevMetrics.length === 0 ||
      !dataBlock?.totalIncidents
    ) {
      return null;
    }

    const dataPoints = kpiConfiguration?.dataPoints;
    const numberOfIncidentsDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .NUMBER_OF_INCIDENTS_DATA_POINT,
    );
    const mttrChartDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.MTTR_DATA_POINT,
    );
    const averageMTTRDataBlockDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .AVERAGE_MTTR_DATA_BLOCK_DATA_POINT,
    );
    const isOneChartVisible =
      dataPointHelpers.isDataPointVisible(mttrChartDataPoint) ||
      dataPointHelpers.isDataPointVisible(numberOfIncidentsDataPoint);

    // const maturityScore = dataBlock?.maturityScore;
    // const maturityColor = getMaturityColorClass(maturityScore);
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
        <div className="new-chart m-3 p-0">
          <div className="d-flex flex-row justify-content-center">
            {/* TODO Values to be integrated from APIs with Actionable insights  */}
            {/* <JiraMeanTimeToResolutionMaturityBlock
                maturityScore={getMaturityScoreText(maturityScore)}
                maturityColor={maturityColor}
                iconOverlayBody={constants.MATURITY_TOOL_TIP[maturityScore]}
            /> */}
            <JiraMTTRDataBlock
              incidents={dataBlock.totalIncidents}
              prevIncidents={dataBlock.previousTotalIncidents}
              dataPoint={numberOfIncidentsDataPoint}
              trend={getReverseTrend(dataBlock.totalIncidents,dataBlock.previousTotalIncidents)}
              getIcon = {getReverseTrendIcon}
              topText={"Total Incidents"}
              bottomText={"Prev Total Incidents"}
              onClick={openPanel}
              classes="mr-2"
              style={{ maxWidth: '300px' }}
            />
            <JiraMTTRDataBlock
              incidents={dataBlock.totalResolvedIncidents}
              prevIncidents={dataBlock.previousTotalResolvedIncidents}
              dataPoint={numberOfIncidentsDataPoint}
              trend={getTrend(dataBlock.totalResolvedIncidents,dataBlock.previousTotalResolvedIncidents)}
              getIcon = {getTrendIcon}
              topText={"Resolved Incidents"}
              bottomText={"Prev Resolved Incidents"}
              classes="mr-2"
              style={{ maxWidth: '300px' }}
            />
            <DataPointVisibilityWrapper
              dataPoint={averageMTTRDataBlockDataPoint}
            >
              <JiraMTTRDataBlock
                incidents={Number(dataBlock?.overallMttrHours)}
                prevIncidents={dataBlock.previousOverallMttrHours}
                dataPoint={numberOfIncidentsDataPoint}
                trend={getReverseTrend(dataBlock.overallMttrHours,dataBlock.previousOverallMttrHours)}
                getIcon = {getReverseTrendIcon}
                topText={"Average MTTR (Hours)"}
                bottomText={"Prev Average MTTR"}
                style={{ maxWidth: '300px' }}
              />
            </DataPointVisibilityWrapper>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column mr-5">
              <div className="chart-label-text"><strong>Min MTTR Hours: </strong>{dataBlock.minMTTR}</div>
              <div className="chart-label-text"><strong>Previous Min MTTR Hours: </strong>{dataBlock.previousMinMTTR}</div>
            </div>
            <div className="d-flex flex-column">
              <div className="chart-label-text"><strong>Max MTTR Hours: </strong>{dataBlock.maxMTTR}</div>
              <div className="chart-label-text"><strong>Previous Max MTTR Hours: </strong>{dataBlock.previousMaxMTTR}</div>
            </div>
          </div>
          <Row>
            {dataPointHelpers.isDataPointVisible(mttrChartDataPoint) && (
              <Col
                lg={12}
                md={6}
                className={"my-2 d-flex flex-column align-items-end"}
                style={{
                  minHeight: '300px',
                  paddingRight: '5rem',
                  paddingLeft: '5rem'
                }}
              >
                <ResponsiveLine
                  {...defaultConfig(
                    "Mean Time to Resolution (in hours)",
                    "Date",
                    false,
                    false,
                    "wholeNumbers",
                    "monthDate2",
                  )}
                  {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY, 0)}
                  valueScale={{ type:'symlog'}}
                  data={metrics}
                  tooltip={({ point: { data: { Count, x, y }}}) => (
                    <ChartTooltip
                      titles={[
                        "Date",
                        "Mean Time to Resolution",
                        "Number of Incidents",
                      ]}
                      values={[
                        new Date(x).toDateString(),
                        `${y} hours`,
                        Count,
                      ]}
                      style={false}
                    />
                  )}
                />
              </Col>
            )}
          </Row>
        </div>
        {/*<div className="ml-2 p-0">{getMetricTopRow()}</div>*/}
        <BadgeBase className={"mx-2"} badgeText={"Note: Results fetched are based on UTC timezone of selected dates"} />
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

JiraMeanTimeToResolutionChart.propTypes = {
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

export default JiraMeanTimeToResolutionChart;
