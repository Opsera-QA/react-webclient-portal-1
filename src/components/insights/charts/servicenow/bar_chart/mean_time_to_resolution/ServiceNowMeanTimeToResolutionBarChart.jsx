import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./ServiceNowMeanTimeToResolutionConfigs.js";
import config2 from "./ServiceNowSeverityCountConfig.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { neutralColor, goalSuccessColor } from "../../../../charts/charts-views";
import { defaultConfig, getColorByData, assignStandardColors, adjustBarWidth, spaceOutServiceNowCountBySeverityLegend } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import {
  METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
  METRIC_THEME_CHART_PALETTE_COLORS,
} from "components/common/helpers/metrics/metricTheme.helpers";
import ServiceNowTotalIncidentsDataBlock from "../../data_blocks/ServiceNowTotalIncidentsDataBlock";
import ServiceNowTotalResolvedIncidentsDataBlock from "../../data_blocks/ServiceNowTotalResolvedIncidentsDatBlock";
import BadgeBase from "../../../../../common/badges/BadgeBase";
import IconBase from "components/common/icons/IconBase";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import ServiceNowAverageTimeToResolveDataBlock from "../../data_blocks/ServiceNowAverageTimeToResolveDataBlock";
import ServiceNowMinMTTRDataBlock from "../../data_blocks/ServiceNowMinMTTRDataBlock";
import ServiceNowMaxMTTRDataBlock from "../../data_blocks/ServiceNowMaxMTTRDataBlock";

// import MeanTimeToResolutionSummaryPanelMetadata from "components/insights/charts/servicenow/bar_chart/mean_time_to_resolution/serviceNowMeanTimeToResolutionSummaryPanelMetadata";
// import Model from "../../../../../../core/data_model/model";
// import ChartDetailsOverlay from "../../../detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowMeanTimeToResolutionBarChart({
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
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const dashboardTags =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value,
        goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value,
        response = await chartsActions.parseConfigurationAndGetChartMetrics(
          getAccessToken,
          cancelSource,
          "serviceNowMTTR",
          kpiConfiguration,
          dashboardTags,
          null,
          null,
          dashboardOrgs
        ),
        dataObject = response?.data?.data[0]?.serviceNowMTTR?.data[0]?.docs,
        barchart = response?.data?.data[0]?.serviceNowMTTR?.data[0]?.severityData,
        overallMeanValue = response?.data?.data[0]?.serviceNowMTTR?.data[0]?.overallMttrHours;

      setGoalsData(goals);
      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
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
      const responseData = response?.data?.data[0]?.serviceNowMTTR?.data[0];
      setTotalIncidents(responseData?.totalIncidents ? responseData?.totalIncidents : 0);
      setTotalResolvedIncidents(responseData?.totalResolvedIncidents ? responseData?.totalResolvedIncidents : 0);
      setMinMTTR(responseData?.minMTTR ? responseData?.minMTTR : 0);
      setMaxMTTR(responseData?.maxMTTR ? responseData?.maxMTTR : 0);
      setLastFiveDays(responseData?.lastFiveDays ? responseData?.lastFiveDays : 0);
      setFiveToFifteenDays(responseData?.fiveToFifteenDays ? responseData?.fiveToFifteenDays : 0);
      setFifteenToThirtyDays(responseData?.fifteenToThirtyDays ? responseData?.fifteenToThirtyDays : 0);
      setBeforeThirtyDays(responseData?.beforeThirtyDays ? responseData?.beforeThirtyDays : 0);
      if(responseData){
        setPriorityOne(responseData['Priority-1'] || 0);
        setPriorityTwo(responseData['Priority-2'] || 0);
        setPriorityThree(responseData['Priority-3'] || 0);
        setPriorityFour(responseData['Priority-4'] || 0);
        setPriorityFive(responseData['Priority-5'] || 0);
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

  const getMetricBottomRow = () =>{
    return (
      <Row>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Resolved Tickets by Severity:`} />
        </Col>
        <Col xl={2} lg={4} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Sev-1: ${priorityOne}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Sev-2: ${priorityTwo}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Sev-3: ${priorityThree}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Sev-4: ${priorityFour}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Sev-5: ${priorityFive}`} />
        </Col>
      </Row>
    );
  };
  const getMetricTopRow = () =>{
    return (
      <Row>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Aging of unresolved tickets:`} />
        </Col>
        <Col xl={2} lg={4} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`Last Five Days: ${lastFiveDays}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`5-15 days: ${fiveToFifteenDays}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`15-30 days: ${fifteenToThirtyDays}`} />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <MetricBadgeBase className={"mr-3"} badgeText={`> 30 Days: ${beforeThirtyDays}`} />
        </Col>
      </Row>
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    
    return (
        <>
          <div className={"chart-footer-text"} style={{marginTop: '10px'}}>
            <MetricBadgeBase className={"mx-2"} badgeText={"Chart depicts recent 15 results"} />
          </div>
          <div className="new-chart m-3 p-0" style={{ minHeight: "300px", display: "flex" }}>
            <Row>
              <Row xl={6} lg={6} md={7} className={"mb-3 d-flex justify-content-center"}>
                  <Col md={12} >
                    <ServiceNowTotalIncidentsDataBlock data={totalIncidents} />
                  </Col>
                  <Col md={12} >
                    <ServiceNowTotalResolvedIncidentsDataBlock data={totalResolvedIncidents} />
                  </Col>
                  <Col md={12} >
                    <ServiceNowAverageTimeToResolveDataBlock data={overallMean} />
                  </Col>
                  <Col md={12} >
                    <ServiceNowMinMTTRDataBlock data={minMTTR} />
                  </Col>
                  <Col md={12} >
                    <ServiceNowMaxMTTRDataBlock data={maxMTTR} />
                  </Col>
              </Row>
              <Col xl={6} lg={6} md={3} className={"my-2 p-0 d-flex flex-column align-items-end"}>
              <div  className="px-1 font-inter-light-400 dark-gray-text-primary"
                      style={{ float: "right", fontSize: "10px" }}>
                  Average MTTR <b>({overallMean} Hours)</b> <IconBase icon={faMinus} iconColor={neutralColor} iconSize={"lg"} />
                  <br></br>
                  Goal<b> ({goalsData?.mttrAvgMeanTimeGoal} Hours)</b>{" "}
                  <IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />
                  <br></br>
                  MTTR{" "}
                  <IconBase icon={faSquare} iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} iconSize={"lg"} />
                </div>
              <ResponsiveBar
                  data={metrics}
                  {...defaultConfig("Mean Time to Resolution (in hours)", "Date", false, false, "wholeNumbers", "monthDate2")}
                  {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
                  {...adjustBarWidth(metrics)}
                  // onClick={(data) => onRowSelect(data)}
                  tooltip={({ indexValue, value, data, color }) => (
                    <ChartTooltip
                      titles={["Date", "Mean Time to Resolution", "Number of Incidents"]}
                      values={[new Date(indexValue).toDateString(), `${value} hours`, data.Count]}
                      style={false}
                      // color={color}
                    />
                  )}
                  markers={[
                    {
                      axis: "y",
                      value: overallMean ? overallMean : 0,
                      lineStyle: { stroke: neutralColor, strokeWidth: 2 },
                      legend: "",
                    },
                    {
                      axis: "y",
                      value: goalsData?.mttrAvgMeanTimeGoal ? goalsData?.mttrAvgMeanTimeGoal : 0,
                      lineStyle: { stroke: goalSuccessColor, strokeWidth: 2 },
                      legend: "",
                    },
                  ]}
                />
                </Col>
                <Col xl={6} lg={6} md={3} className={"my-2 p-0 d-flex flex-column align-items-end"}>
                <ResponsiveBar
                  data={sevMetrics}
                  {...defaultConfig("Number of Incidents", "Severity", false, false, "wholeNumbers")}
                  {...config2(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
                  {...adjustBarWidth(sevMetrics)}
                  // onClick={(data) => onRowSelect(data)}
                  tooltip={({ indexValue, value }) => (
                    <ChartTooltip
                      titles={["Severity", "Number of Incidents"]}
                      values={[indexValue, `${value}`]}
                      style={false}
                      // color={color}
                    />
                  )}
                />
                </Col>
                </Row>
          </div>
          <div className="ml-2 p-0">
            {getMetricTopRow()}
          </div>
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

ServiceNowMeanTimeToResolutionBarChart.propTypes = {
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

export default ServiceNowMeanTimeToResolutionBarChart;
