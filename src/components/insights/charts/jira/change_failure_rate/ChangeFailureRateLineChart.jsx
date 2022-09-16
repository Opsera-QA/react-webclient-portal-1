// Analytics Software Development Tab, Developer, Node Ticket AN-153
import PropTypes from "prop-types";
// import { ResponsiveLine } from "@nivo/line";
// import config from "./jiraIssuesCreatedVsResolvedLineChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CHANGE_FAILURE_RATE_CONSTANTS as constants } from "./ChangeFailureRate_kpi_datapoint_identifiers";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
// import { defaultConfig, getColor, assignIssueColors } from "../../../charts-views";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import ChangeFailureRateDataBlockContainer from "./ChangeFailureRateDataBlockContainer";
import jiraAction from "../jira.action";

function ChangeFailureRateLineChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);

  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [changeFailureRateDataPoint, setChangeFailureRateDataPoint] =
  useState(undefined);

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const dataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .CHANGE_FAILURE_RATE_DATA_POINT,
    );
    setChangeFailureRateDataPoint(dataPoint);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadDataPoints(cancelSource);
      let dashboardTags =
          dashboardData?.data?.filters[
              dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
              ]?.value;
      let dashboardOrgs =
          dashboardData?.data?.filters[
              dashboardData?.data?.filters.findIndex(
                  (obj) => obj.type === "organizations",
              )
              ]?.value;
      let goals =
          kpiConfiguration?.dataPoints[0]?.strategic_criteria?.data_point_evaluation_rules?.success_rule?.primary_trigger_value;
      // if (goals) {
      //   setGoalsData({deployment_frequency_rate: goals});
      // } else {
      //   setGoalsData(DEFAULT_GOALS);
      // }
      const response = await jiraAction.getJiraChangeFailureRate(getAccessToken,cancelTokenSource,kpiConfiguration,dashboardTags,dashboardOrgs);

      const dataObject =
        response?.data && response?.status === 200
          ? response?.data?.data?.jiraChangeFailureRate?.data
          : {};
      //   assignIssueColors(dataObject);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        if (dataObject.chartData) {
          setChartData(dataObject.chartData);
        }
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

  const getChartBody = () => {
    if (!metrics && !metrics.total) {
      return null;
    }
    return (
      <Row className={"mx-0 p-2 justify-content-between"}>
        {dataPointHelpers.isDataPointVisible(changeFailureRateDataPoint) && (
          <Col
            className={"px-0"}
            xl={12}
            md={12}
          >
            <ChangeFailureRateDataBlockContainer
              metricData={metrics}
              chartData={chartData}
              goalsData={12}
              kpiConfiguration={kpiConfiguration}
              dataPoint={changeFailureRateDataPoint}
            />
          </Col>)}
      </Row>
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

ChangeFailureRateLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ChangeFailureRateLineChart;
