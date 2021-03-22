import React, {useState, useEffect, useContext, useRef, Fragment} from "react";
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
import { defaultConfig, getColorByData, assignStandardColors } from '../../../charts-views';
import ChartTooltip from '../../../ChartTooltip';
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
      assignStandardColors(dataObject, true);
      dataObject.forEach(data => data.Count = data.count);

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
    const getMaxValue = (data) => {
      let countsMax = Math.max.apply(Math,data.map(function(o){return o.count;}));
      let mttrMax = Math.max.apply(Math,data.map(function(o){return o.mttr;}));
      let max = Math.ceil(Math.max(countsMax, mttrMax));
      return max;
    }
    const MeanLineLayer = ({ bars, xScale, yScale }) => {
        const lineColor = "rgba(0, 128, 0, 1)";
        const lineGenerator = line()
          .x(d => xScale(d.data.data._id))
          .y(d => yScale(d.data.data.mttr));
        return (
          <Fragment>
          <path
            d={lineGenerator(bars)}
            fill="none"
            stroke={lineColor}
            strokeWidth="3"
            style={{ pointerEvents: "none" }}
          />
          {bars.map(bar => {
            return <circle
              key={bar.key}
              cx={xScale(bar.data.data._id)}
              cy={yScale(bar.data.data.mttr)}
              r={4}
              fill={lineColor}
              stroke={lineColor}
              style={{ pointerEvents: "none" }}
            />
          }
          )}
        </Fragment>        
        );
      };

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <ResponsiveBar
          data={metrics}
          {...defaultConfig("Number of Deployments", "Date", 
                    false, true, "wholeNumbers", "monthDate2")}
          {...config(getColorByData, getMaxValue(metrics))}
          onClick={() => setShowModal(true)}
          tooltip={({ indexValue, value, data, color }) => <ChartTooltip 
                    titles={["Date", "Number of Deployments", "Mean Time To Restore"]}
                    values={[new Date(indexValue).toDateString(), value, `${data.mttr} minutes`]}
                    style={false}
                    color={color} />}
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
