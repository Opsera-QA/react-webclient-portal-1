import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./opseraPipelineByStatusBarChartConfigs";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import axios from "axios";
import { defaultConfig, getColorById, assignBooleanColors,
         adjustBarWidth } from '../../../charts-views';
import ChartTooltip from '../../../ChartTooltip';

function OpseraPipelineByStatusBarChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis}) {
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "opseraPipelineByStatus", kpiConfiguration, dashboardTags);
      let dataObject = response?.data?.data[0]?.opseraPipelineByStatus?.data;
      dataObject && assignBooleanColors(dataObject);
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
          {...defaultConfig("Pipeline Name", "Number of Pipelines", 
                      true, false, "cutoffString", "wholeNumbers")}
          {...config(getColorById)}
          {...adjustBarWidth(metrics, false)}
          onClick={() => setShowModal(true)}
          tooltip={({indexValue, color, value, id}) => <ChartTooltip 
                                        titles = {["Pipeline", `${id} Builds`]}
                                        values = {[indexValue, value]}
                                        style = {false}
                                        color = {color} />}
        />
      </div>
    );
  };

  return (
      <div>
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
        <ModalLogs header="Status by Pipeline" size="lg" jsonMessage={metrics} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
      </div>
    );
}

OpseraPipelineByStatusBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraPipelineByStatusBarChart;