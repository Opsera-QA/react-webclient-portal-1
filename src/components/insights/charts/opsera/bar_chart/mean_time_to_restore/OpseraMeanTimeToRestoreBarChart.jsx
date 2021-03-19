import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./opseraMeanTimeToRestoreConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { line } from "d3-shape";

function OpseraMeanTimeToRestoreBarChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis}) {
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "opseraMeanTimeToRestore", kpiConfiguration, dashboardTags);
      let dataObject = response?.data?.data[0]?.opseraMeanTimeToRestore?.data;

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
    const MeanLineLayer = ({ bars, xScale, yScale }) => {
        console.log(bars);
        const lineGenerator = line()
          .x(d => xScale(d.data.data._id))
          .y(d => yScale(d.data.data.mttr));
        return (
          <path d={lineGenerator(bars)} fill="none" stroke="rgba(200, 30, 15, 1)" strokeWidth="3" />
        );
      };

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <ResponsiveBar
          data={metrics}
          keys={config.keys}
          indexBy="_id"
          onClick={() => setShowModal(true)}
          margin={config.margin}
          padding={0.3}
          layout={"vertical"}
          colors={{ scheme: "dark2" }}
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
          borderRadius={5}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          layers={["grid", MeanLineLayer, "axes", "bars", "markers", "mesh", "legends"]}       
          borderWidth={2}
          motionDamping={15}
          legends={config.legends}
          tooltip={({ indexValue, value, data, color }) => (
            <div>
              <strong style={{ color }}>Date: </strong> {indexValue}
              <br />
              <strong style={{ color }}> No. of Deployments: </strong> {value} deployments
              <br />
              <strong style={{ color }}> Mean Time to Restore: </strong> {data.mttr} minutes
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
        <ModalLogs
          header="Mean Time to Restore"
          size="lg"
          jsonMessage={metrics}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />
      </>
    );
}

OpseraMeanTimeToRestoreBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraMeanTimeToRestoreBarChart;
