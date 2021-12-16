import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./ServiceNowMeanTimeToResolutionConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { neutralColor } from "../../../../charts/charts-views";
import { defaultConfig, getColorByData, assignStandardColors, adjustBarWidth } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/pro-solid-svg-icons";
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

      const dashboardTags =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value,
        response = await chartsActions.parseConfigurationAndGetChartMetrics(
          getAccessToken,
          cancelSource,
          "serviceNowMTTR",
          kpiConfiguration,
          dashboardTags
        ),
        dataObject = response?.data?.data[0]?.serviceNowMTTR?.data[0]?.docs;

      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setOverallMean(response?.data?.data[0]?.serviceNowMTTR?.data[0]?.overallMttrMins);
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

    return (
      <div className="new-chart mb-3 pointer" style={{ height: "300px" }}>
        <div style={{ float: "right", fontSize: "10px" }}>
          Total Number of Incidents - #<br></br>
          <FontAwesomeIcon icon={faMinus} color={neutralColor} size="lg" /> Average MTTR <b>({overallMean} Minutes)</b>
        </div>

        <ResponsiveBar
          data={metrics}
          {...defaultConfig("Mean Time to Resolution (in minutes)", "Date", false, false, "wholeNumbers", "monthDate2")}
          {...config(getColorByData)}
          {...adjustBarWidth(metrics)}
          // onClick={(data) => onRowSelect(data)}
          tooltip={({ indexValue, value, data, color }) => (
            <ChartTooltip
              titles={["Date", "Mean Time to Resolution", "Number of Incidents"]}
              values={[new Date(indexValue).toDateString(), `${value} minutes`, data.Count]}
              style={false}
              color={color}
            />
          )}
          markers={[
            {
              axis: "y",
              value: overallMean,
              lineStyle: { stroke: neutralColor, strokeWidth: 2 },
              legend: "Mean",
            },
          ]}
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
