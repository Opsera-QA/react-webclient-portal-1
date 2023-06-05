import React, { useState, useEffect, useRef, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { metricHelpers } from "components/insights/metric.helpers";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import { AuthContext } from "../../../../../contexts/AuthContext";
import TasksActions from "./tasks-actions";
import AverageExecutionTimeThreeBlock from "../data-blocks/AverageExecutionTimeThreeBlock/AverageExecutionTimeThreeBlock";
import TotalUniqueTasks from "../data-blocks/TotalUniqueTasks/TotalUniqueTasks";
import TotalTaskSucceded from "../data-blocks/TotalTaskSucceded/TotalTaskSucceded";
import TotalTaskFailed from "../data-blocks/TotalTaskFailed/TotalTaskFailed";
import TotalTaskExecutedByCount from "../data-blocks/TotalTaskExecutedByCount/TotalTaskExecutedByCount";
import { SALESFORCE_ORG_SYNC_METRIC_CONSTANTS } from "./SalesforceOrgSync_kpi_datapoint_identifiers";
import { getTrendForBlocks } from '../utils';

function SalesforceOrgSyncDataBlocks({
  kpiConfiguration,
  dashboardData,
  setError,
}) {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);
  const [averageExecutionDataPoint, setAverageExecutionTimeDataPoint] =
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadDataPoints();
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(
        dashboardData?.data?.filters,
      );
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const res =
        await TasksActions.sfdcOrgSyncKPIDataBlocks(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs,
          dashboardFilters,
        );
      const [response, prevResponse] = res.data
      if (
        prevResponse?.data?.length === 0 &&
        response?.data?.length > 0
      ) {
        response.data[0].prevAverageExecutionTimeByCount = 0;
      } else if (
        prevResponse?.data?.length > 0 &&
        response?.data?.length > 0
      ) {
        response.data[0].prevAverageExecutionTimeByCount =
        prevResponse.data[0].averageExecutionTimeByCount;
      }

      if (response?.data?.length > 0) {
        response.data[0].executedTimeTrend = getTrendForBlocks(
          response.data[0].averageExecutionTimeByCount,
          response.data[0].prevAverageExecutionTimeByCount,
        );
      }

      let dataObject = response?.data[0];
      if (isMounted?.current === true) {
        setMetrics(dataObject);
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

  if (isLoading) {
    return (
      <LoadingDialog
        message={"Loading Data"}
        size={"sm"}
      />
    );
  }

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const averageExecutionTimeDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      SALESFORCE_ORG_SYNC_METRIC_CONSTANTS.SUPPORTED_DATA_POINT_IDENTIFIERS
        .BASE_KPI_AVERAGE_EXECUTION_TIME_DATA_POINT,
    );
    setAverageExecutionTimeDataPoint(averageExecutionTimeDataPoint);
  };

  return (
    <Row className={"mx-1"} style={{ justifyContent: "space-evenly" }}>
      <TotalUniqueTasks score={metrics?.numberOfUniqueTask} colSize={3} />
      <TotalTaskExecutedByCount score={metrics?.numberOfTaskExecutedByCount} colSize={3} />
      <TotalTaskSucceded score={metrics?.numberOfSuccessTaskByCount} colSize={3} />
      <TotalTaskFailed score={metrics?.numberOfFailedTaskByCount} colSize={3} />
      {dataPointHelpers.isDataPointVisible(averageExecutionDataPoint) && (
        <AverageExecutionTimeThreeBlock
          score={metrics?.averageExecutionTimeByCount}
          prevScore={metrics?.prevAverageExecutionTimeByCount}
          trend={metrics?.executedTimeTrend?.trend}
          dataPoint={averageExecutionDataPoint}
        />
      )}
    </Row>
  );
}

SalesforceOrgSyncDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  setError: PropTypes.func,
};

export default SalesforceOrgSyncDataBlocks;
