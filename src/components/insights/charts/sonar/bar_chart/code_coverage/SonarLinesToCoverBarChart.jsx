// Analytics Software Testing, Persona Manager/Developer/Executive, Node Ticket AN-147
import config from "components/insights/charts/sonar/bar_chart/code_coverage/sonarCodeCoverageBarChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { format } from "date-fns";
import { defaultConfig, getColorByData, assignStandardColors,
         adjustBarWidth } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";

function SonarLinesToCoverBarChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarCodeCoverage", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.sonarCodeCoverage?.data : [];
      assignStandardColors(dataObject, true);
      // to capitalize the legend and display "Uncovered Lines" instead of "uncovered_lines"
      dataObject.forEach(data => data["Uncovered Lines"] = data.uncovered_lines);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
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
      <div className="new-chart mb-3" style={{height: "300px"}}>
      <ResponsiveBar
        data={metrics}
        {...defaultConfig("Value", "Code Coverage Metric", 
                  false, false, "", "monthDate2")}
        {...config(getColorByData)}
        {...adjustBarWidth(metrics)}
        onClick={() => setShowModal(true)}
        tooltip={({ indexValue, value, color, data }) => <ChartTooltip 
                titles = {["Timestamp", "Uncovered Lines", "Project Key"]}
                values = {[format(new Date(indexValue), "yyyy-MM-dd', 'hh:mm a"), value, data.key]}
                style = {false}
                color = {color} />}
          />
      </div>
    </>
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
        header="Lines to Cover"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SonarLinesToCoverBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default SonarLinesToCoverBarChart;