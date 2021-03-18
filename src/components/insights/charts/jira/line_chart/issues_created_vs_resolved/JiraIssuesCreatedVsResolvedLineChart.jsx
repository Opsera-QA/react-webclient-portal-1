// Analytics Software Development Tab, Developer, Node Ticket AN-153
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./jiraIssuesCreatedVsResolvedLineChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

function JiraIssuesCreatedVsResolvedLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "jiraIssuesCreatedAndResolved", kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.jiraIssuesCreatedAndResolved.status === 200 ? response?.data?.data[0]?.jiraIssuesCreatedAndResolved?.data : [];

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
            onClick={() => setShowModal(true)}
            margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
            xScale={{
              type: "time",
              format: "%Y-%m-%d",
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
              type: "linear",
              stacked: false,
            }}
            axisLeft={config.axisLeft}
            axisBottom={config.axisBottom}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            legends={config.legends}
            colors={(d) => d.color}
            // onClick={function(node){console.log(node.id);}}
            tooltip={(node) => (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <strong> Date: </strong> {node.point.data.xFormatted} <br></br>
                <strong>
                  {node.point.serieId}: {node.point.data.yFormatted}
                </strong>
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
        header="Issues Created vs. Resolved"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}
JiraIssuesCreatedVsResolvedLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default JiraIssuesCreatedVsResolvedLineChart;
