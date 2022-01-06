import React, { useState, useEffect, useContext, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./ServiceNowMeanTimeBetweenFailuresConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
// import { line } from "d3-shape";
import {
  defaultConfig,
  getColorByData,
  assignStandardColors,
  adjustBarWidth,
  // accentColor,
} from "../../../charts-views";

import ChartTooltip from "../../../ChartTooltip";
// import MeanTimeToResolutionSummaryPanelMetadata from "components/insights/charts/servicenow/bar_chart/mean_time_between_failures/ServiceNowMeanTimeBetweenFailuresSummaryPanelMetadata";
// import Model from "../../../../../../core/data_model/model";
// import ChartDetailsOverlay from "../../../detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowMeanTimeBetweenFailuresBarChart({
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "serviceNowMTBF",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      let dataObject = response?.data?.data[0]?.serviceNowMTBF?.data[0]?.docs;
      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }

      if (!dataObject) {
        setMetrics([]);
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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    const getMaxValue = (data) => {
      let countsMax = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.count;
        })
      );
      let mtbfMax = Math.max.apply(
        Math,
        data.map(function (o) {
          return o["mtbf"];
        })
      );
      let max = Math.ceil(Math.max(countsMax, mtbfMax));
      return max;
    };

    return (
      <div className="new-chart mb-3 pointer" style={{ height: "300px" }}>
        <div style={{ float: "right", fontSize: "10px" }}>Total Number of Incidents - #</div>
        <ResponsiveBar
          data={metrics}
          {...defaultConfig(
            "Mean Time Between Failures (in minutes)",
            "Date",
            false,
            false,
            "wholeNumbers",
            "monthDate2"
          )}
          {...config(getColorByData, getMaxValue(metrics))}
          {...adjustBarWidth(metrics)}
          // onClick={(data) => onRowSelect(data)}
          tooltip={({ indexValue, value, data, color }) => (
            <ChartTooltip
              titles={["Date", "Mean Time Between Failures", "Number of Incidents"]}
              values={[new Date(indexValue).toDateString(), `${value} minutes`, data.Count]}
              style={false}
              color={color}
            />
          )}
        />
      </div>
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
        header="Mean Time Between Failures"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

ServiceNowMeanTimeBetweenFailuresBarChart.propTypes = {
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

export default ServiceNowMeanTimeBetweenFailuresBarChart;
