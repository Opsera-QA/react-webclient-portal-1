import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./ServiceNowMeanTimeToResolutionConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { neutralColor, goalSuccessColor } from "../../../../charts/charts-views";
import { defaultConfig, getColorByData, assignStandardColors, adjustBarWidth } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import {
  METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
  METRIC_THEME_CHART_PALETTE_COLORS,
} from "components/common/helpers/metrics/metricTheme.helpers";
import ServiceNowTotalIncidentsDataBlock from "../../data_blocks/ServiceNowTotalIncidentsDataBlock";
import ServiceNowTotalResolvedIncidentsDataBlock from "../../data_blocks/ServiceNowTotalResolvedIncidentsDatBlock";
import BadgeBase from "../../../../../common/badges/BadgeBase";
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
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [overallMean, setOverallMean] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [totalResolvedIncidents, setTotalResolvedIncidents] = useState(0);

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
        overallMeanValue = response?.data?.data[0]?.serviceNowMTTR?.data[0]?.overallMttrHours;

      setGoalsData(goals);
      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setOverallMean(overallMeanValue);
      }

      if (!dataObject) {
        setMetrics([]);
      }
      const responseData = response?.data?.data[0]?.serviceNowMTTR?.data[0];
      setTotalIncidents(responseData?.totalIncidents ? responseData?.totalIncidents : 0);
      setTotalResolvedIncidents(responseData?.totalResolvedIncidents ? responseData?.totalResolvedIncidents : 0);
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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
        <>
          <div className={"chart-footer-text"} style={{marginTop: '10px'}}>
            <BadgeBase className={"mx-2"} badgeText={"*Chart depicts recent 15 results"} />
          </div>
          <div className="new-chart m-3 p-0" style={{ minHeight: "300px", display: "flex" }}>
            <Row>
              <Col xl={3} lg={3} md={4} className={"d-flex align-content-around"}>
                <Row>
                  <Col lg={12} className={"my-3"} style={{ paddingTop: "8px"}}>
                    <ServiceNowTotalIncidentsDataBlock data={totalIncidents} />
                  </Col>
                  <Col lg={12} className={"my-3"}>
                    <ServiceNowTotalResolvedIncidentsDataBlock data={totalResolvedIncidents} />
                  </Col>
                </Row>
              </Col>
              <Col xl={9} lg={9} md={8} className={"my-2 p-0 d-flex flex-column align-items-end"}>
                <div  className="px-3 font-inter-light-400 dark-gray-text-primary"
                      style={{ float: "right", fontSize: "10px" }}>
                  Average MTTR <b>({overallMean} Hours)</b> <FontAwesomeIcon icon={faMinus} color={neutralColor} size="lg" />
                  <br></br>
                  Goal<b> ({goalsData?.mttrAvgMeanTimeGoal} Hours)</b>{" "}
                  <FontAwesomeIcon icon={faMinus} color={goalSuccessColor} size="lg" />
                  <br></br>
                  MTTR{" "}
                  <FontAwesomeIcon icon={faSquare} color={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} size="lg" />
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
            </Row>
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
