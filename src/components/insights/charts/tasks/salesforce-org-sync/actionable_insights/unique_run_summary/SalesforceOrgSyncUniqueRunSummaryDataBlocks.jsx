import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { metricHelpers } from "components/insights/metric.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import taskActions from "../../tasks-actions";
import ExecutionTime from "../../../data-blocks/ExecutionTime/ExecutionTime";
import TotalComponentsDeployed from "../../../data-blocks/TotalComponentsDeployed/TotalComponentsDeployed";

function SalesforceOrgSyncUniqueRunSummaryDataBlocks(
  {
    kpiConfiguration,
    dashboardData,
    selectedRunObject,
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
      const response = await taskActions.sfdcOrgSyncActionableTwoDataBlocks(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        dashboardTags,
        dashboardOrgs,
        selectedRunObject._id
      );

      const metrics = response?.data?.data[0];

      if (isMounted?.current === true && metrics) {
        setMetrics(metrics);
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
    <div className={"mx-3"}>
      <Row>
        <ExecutionTime score={metrics?.executionTime} />
        <TotalComponentsDeployed score={metrics?.totalComponentsDeployed} />
      </Row>
    </div>
  );
}

SalesforceOrgSyncUniqueRunSummaryDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  selectedRunObject: PropTypes.object,
};

export default SalesforceOrgSyncUniqueRunSummaryDataBlocks;
