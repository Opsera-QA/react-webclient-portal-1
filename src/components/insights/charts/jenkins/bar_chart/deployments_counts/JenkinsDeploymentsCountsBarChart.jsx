import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./jenkinsDeploymentCountsBarChartConfigs";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig,
  getColorByData,
  assignBooleanColors,
  adjustBarWidth,
  capitalizeLegend,
} from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";

function JenkinsDeploymentCountsBarChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
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
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "jenkinsDeploymentFrequencyCounts",
        kpiConfiguration,
        dashboardTags,
      );
      let dataObject = response?.data
        ? response?.data?.data[0]?.jenkinsDeploymentFrequencyCounts?.data
        : [];
      assignBooleanColors(dataObject, true);
      capitalizeLegend(dataObject, ["value"]);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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
      <div
        className="new-chart mb-3"
        style={{ height: "300px" }}
      >
        <ResponsiveBar
          data={metrics}
          {...defaultConfig(
            "Deployment Count",
            "Date",
            false,
            true,
            "values",
            "yearMonthDate",
          )}
          {...config(getColorByData)}
          {...adjustBarWidth(metrics)}
          onClick={() => setShowModal(true)}
          tooltip={({ indexValue, color, value, id, data }) => (
            <ChartTooltip
              titles={[
                "Date",
                `${capitalizeFirstLetter(id)} Builds`,
                "Failure Rate",
              ]}
              values={[
                indexValue,
                value,
                data.failureRate
                  ? data.failureRate.toFixed(2) + "%"
                  : "0" + "%",
              ]}
              style={false}
              color={color}
            />
          )}
        />
      </div>
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
        header="Deployment Counts"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

JenkinsDeploymentCountsBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default JenkinsDeploymentCountsBarChart;
