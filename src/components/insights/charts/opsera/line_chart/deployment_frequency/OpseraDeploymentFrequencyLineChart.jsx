import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./opseraDeploymentFrequencyLineChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColor, assignBooleanColors } from '../../../charts-views';
import ChartTooltip from '../../../ChartTooltip';
function OpseraDeploymentFrequencyLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "opseraPipelineDeploymentFrequency", kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.opseraPipelineDeploymentFrequency.status === 200 ? response?.data?.data[0]?.opseraPipelineDeploymentFrequency?.data : [];
      assignBooleanColors(dataObject);

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
        <ResponsiveLine
          data={metrics}
          {...defaultConfig("Number of Deployments", "Date", 
                      false, false, "wholeNumbers", "monthDate")}
          {...config(getColor)}
          onClick={() => setShowModal(true)}
          tooltip={({point, color}) => <ChartTooltip 
                                        titles = {["Date", "Number of Deployments"]}
                                        values = {[String(point.data.xFormatted), point.data.y]}
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
OpseraDeploymentFrequencyLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraDeploymentFrequencyLineChart;