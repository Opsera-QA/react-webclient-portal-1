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
import { defaultConfig, getColor, assignStandardColors, mainPurple, accentColor } from '../../../charts-views';
import ChartTooltip from '../../../ChartTooltip';

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
    };
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "jiraLeadTime", kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200 ? response?.data?.data[0]?.jiraLeadTime?.data : [];
      assignStandardColors(dataObject && dataObject[0]?.data, true);

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

    //TODO: Do these need to be passed in via object props?
    const MeanLineLayer = ({ nodes, xScale, yScale }) => {
      const lineGenerator = line()
        .x(d => xScale(d.data.x))
        .y(d => yScale(d.data.mean));
      return (
        <path d={lineGenerator(nodes)} fill="none" stroke={mainPurple} strokeWidth="3" />
      );
    };

    //TODO: Do these need to be passed in via object props?
    const RollingMeanLineLayer = ({ nodes, xScale, yScale }) => {
      const lineGenerator = line()
        .x(d => xScale(d.data.x))
        .y(d => yScale(d.data.rolling_mean));
      return (
        <path d={lineGenerator(nodes)} fill="none" stroke={accentColor} strokeWidth="2" />
      );
    };

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <ResponsiveScatterPlot
          data={metrics}
          {...defaultConfig("Lead Time", "Date", 
                      false, true, "wholeNumbers", "monthDate")}
          {...config(getColor, MeanLineLayer, RollingMeanLineLayer)}
          onClick={() => setShowModal(true)}
          tooltip={({node, color}) => <ChartTooltip 
                                        titles = {["Issue", "Date Completed", "Lead Time"]}
                                        values = {[String(node.data._id), String(node.data.date_finished), 
                                                  `${node.data.y} ${node.data.y > 1 ? "days" : "day"}`]}
                                        color = {color} />}
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
  setKpis: PropTypes.func,
  nodes: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any
};

export default JiraLeadTimeLineChart;
