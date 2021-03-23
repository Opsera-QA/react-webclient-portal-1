// Ticket Number - AN 120 Sprint Velocity Chart
// Worked on By - Shrey Malhotra
// Sprint - Analytics Mt. Rainier
// Location - There is no chart details or location present on the ticket but chart has been added to planning tab with other Jira Metrics

import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./jiraVelocityReportBarChartConfigs";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

function JiraVelocityBarChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
    }
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "jiraVelocityReport", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.jiraVelocityReport?.data : [];

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
      <div className="new-chart mb-3" style={{height: "300px"}}>
            <ResponsiveBar
              data={metrics}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="_id"
              margin={config.margin}
              padding={0.3}
              layout={"vertical"}
              groupMode={"grouped"}
              // colors={({ id, data }) => data[`${id}_color`]}
              borderColor={{ theme: "background" }}
              colorBy="id"
              defs={config.defs}
              fill={config.fill}
              axisTop={null}
              axisRight={null}
              axisBottom={config.axisBottom}
              axisLeft={config.axisLeft}
              labelSkipWidth={12}
              labelSkipHeight={12}
              enableLabel={false}
              borderRadius={0}
              labelTextColor="inherit:darker(2)"
              animate={true}
              legends={config.legends}
              motionStiffness={90}
              borderWidth={2}
              motionDamping={15}
              tooltip={({ indexValue, value, id, data }) => (
                <div>
                  <strong> Sprint Name: </strong> {indexValue}
                  <br></br>
                  <strong> Issue State: </strong> {id}
                  <br></br>
                  <strong> No. of Issues: </strong> {value}
                  <br></br>
                  <strong> Percent Completed: </strong> {data.percentage}%<br></br>
                </div>
              )}
              theme={{
                tooltip: {
                  container: {
                    fontSize: "16px",
                  },
                },
              }}
            />
        </div>
    );
  }

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
        header="Velocity Report"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

JiraVelocityBarChart.propTypes = {
  persona: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  setKpiConfiguration: PropTypes.func,
  dashboardData: PropTypes.object,
  index: PropTypes.any,
  setKpis: PropTypes.func
};

export default JiraVelocityBarChart;
