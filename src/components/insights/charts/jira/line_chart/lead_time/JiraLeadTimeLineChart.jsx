import PropTypes from "prop-types";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import config from "./jiraLeadTimeLineChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { line } from "d3-shape";

function JiraLeadTimeLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "jiraLeadTime", kpiConfiguration);
      const dataObject = response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200 ? response?.data?.data[0]?.jiraLeadTime?.data : [];

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

    const MeanLineLayer = ({ nodes, xScale, yScale }) => {
      const lineGenerator = line()
        .x(d => xScale(d.data.x))
        .y(d => yScale(d.data.mean));
      return (
        <path d={lineGenerator(nodes)} fill="none" stroke="rgba(200, 30, 15, 1)" strokeWidth="3" />
      );
    };

    const RollingMeanLineLayer = ({ nodes, xScale, yScale }) => {
      const lineGenerator = line()
        .x(d => xScale(d.data.x))
        .y(d => yScale(d.data.rolling_mean));
      return (
        <path d={lineGenerator(nodes)} fill="none" stroke="rgba(30, 15, 200, 1)" strokeWidth="2" />
      );
    };

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <ResponsiveScatterPlot
          data={metrics}
          onClick={() => setShowModal(true)}
          indexBy="date"
          margin={{top: 50, right: 110, bottom: 80, left: 120}}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            precision: "day",
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{ type: "linear", min: 0, max: "auto", stacked: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          pointSize={10}
          pointBorderWidth={8}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          lineWidth={3.5}
          layers={["grid", "axes", MeanLineLayer, RollingMeanLineLayer, "nodes", "markers", "mesh", "legends"]}       
          // legends={config.legends}
          tooltip={({node, color}) => (
            <div
              style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
              }}
            >
              <strong style={{color}}> Issue: </strong> {String(node.data._id)}
              <br />
              <strong style={{color}}> Date Completed: </strong> {String(node.data.date_finished)}
              <br />
              <strong style={{color}}> Lead Time: </strong> {node.data.y}
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
      />
      <ModalLogs header="Deployments Graph" size="lg" jsonMessage={metrics} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
    </>
  );
}
JiraLeadTimeLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default JiraLeadTimeLineChart;
