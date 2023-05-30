import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { metricHelpers } from "components/insights/metric.helpers";

import useComponentStateReference from "hooks/useComponentStateReference";
import TotalTaskExecuted from "../../../data-blocks/TotalTaskExecuted/TotalTaskExecuted";
import TotalTaskSucceded from "../../../data-blocks/TotalTaskSucceded/TotalTaskSucceded";
import AverageExecutionTimeTwoBlock from "../../../data-blocks/AverageExecutionTimeTwoBlock/AverageExecutionTimeTwoBlock";
import TotalTaskFailed from "../../../data-blocks/TotalTaskFailed/TotalTaskFailed";
import taskActions from "../../tasks-actions";

function BulkMigrationDetailedRunSummaryDataBlocks(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
  }) {
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [JSON.stringify(dashboardData)]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      const response = await taskActions.bulkMigrationActionableOneDataBlocks(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        taskId,
      );
      let dataObject = response?.data?.data[0];
      if (isMounted?.current === true && dataObject) {
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
    return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
  }

  return (
    <div className={"px-3"}>
      <Row style={{ justifyContent: "space-evenly" }}>
        <TotalTaskExecuted score={metrics?.details?.[0]?.totalTask || 'N/A'} />
        <TotalTaskSucceded score={metrics?.details?.[0]?.totalTaskSuccess || 'N/A'} />
        <AverageExecutionTimeTwoBlock score={metrics?.details?.[0]?.averageExecutionTime || 'N/A'} />
        <TotalTaskFailed score={metrics?.details?.[0]?.numberOfFailedTaskRun || 'N/A'} />
      </Row>
    </div>
  );
}

BulkMigrationDetailedRunSummaryDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
};

export default BulkMigrationDetailedRunSummaryDataBlocks;
