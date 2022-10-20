import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import { JIRA_CHANGE_FAILURE_RATE_CONSTANTS as constants } from "./JiraChangeFailureRate_kpi_datapoint_identifiers";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import jiraAction from "../../jira.action";
import JiraChangeFailureRateDataBlockContainer from "./JiraChangeFailureRateDataBlockContainer";
import {getResultFromKpiConfiguration,getReverseTrend} from "../../../charts-helpers";
import JiraChangeFailureRateHelpDocumentation
  from "../../../../../common/help/documentation/insights/charts/JiraChangeFailureRateHelpDocumentation";

const DEFAULT_GOALS = {
  change_failure_rate: 10,
};

function JiraChangeFailureRate({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] =
    useState(undefined);
  const [chartData, setChartData] =
    useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);
  const [changeFailureRateDataPoint, setChangeFailureRateDataPoint] =
      useState(undefined);

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
  }, []);

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
      if (goals) {
        setGoalsData({change_failure_rate: goals});
      } else {
        setGoalsData(DEFAULT_GOALS);
      }
      const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
      let response;
      if(jiraResolutionNames?.length){
        response = await jiraAction.getJiraChangeFailureRate(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        );
        const metrics = response?.data?.data?.jiraChangeFailureRate?.data;
        if (isMounted?.current === true && Array.isArray(metrics?.chartData)) {
          setMetricData(metrics);
          setChartData(metrics?.chartData);
        }
      } else {
        // This is required when there is no changeType selected but still need the chart to show no data
        setChartData([]);
        setMetricData({changeFailureRate:"0", prevChangeFailureRate:"NA"});
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

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const dataPoint = dataPointHelpers.getDataPoint(
        dataPoints,
        constants.SUPPORTED_DATA_POINT_IDENTIFIERS
            .CHANGE_FAILURE_RATE_DATA_POINT,
    );
    setChangeFailureRateDataPoint(dataPoint);
  };

  const getDataBlock = () => {
    if (dataPointHelpers.isDataPointVisible(changeFailureRateDataPoint) === false) {
      return null;
    }

    return (
      <Row className={"mx-0 p-2 justify-content-between"}>
        {dataPointHelpers.isDataPointVisible(changeFailureRateDataPoint) && (
          <Col className={"px-0"} xl={12} md={12}>
            <JiraChangeFailureRateDataBlockContainer
              metricData={metricData}
              chartData={chartData}
              goalsData={goalsData?.change_failure_rate}
              kpiConfiguration={kpiConfiguration}
              dataPoint={changeFailureRateDataPoint}
              trend={getReverseTrend(metricData.changeFailureRate,metricData.prevChangeFailureRate)}
            />
          </Col>
        )}
      </Row>
    );
  };
  const getChartBody = () => {
    if (!metricData || !Array.isArray(chartData) || !metricData.changeFailureRate) {
      return null;
    }
    return (
      <>
        {getDataBlock()}
      </>
    );
  };

  return (
    <div>
      <VanityMetricContainer
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
        chartHelpComponent={(closeHelpPanel) => (
          <JiraChangeFailureRateHelpDocumentation
            closeHelpPanel={closeHelpPanel}
          />
        )}
      />
    </div>
  );
}

JiraChangeFailureRate.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default JiraChangeFailureRate;
