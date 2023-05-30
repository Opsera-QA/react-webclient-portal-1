import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { metricHelpers } from "components/insights/metric.helpers";
import taskActions from "./tasks-actions";
import SalesforceToGitMergeBottomTable from "./SalesforceToGitMergeBottomTable";
import { salesforceToGitMergeSyncMetadata } from "./salesforceToGitMergeSync.metadata";

function SalesforceToGitMergeTableOverlay({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [mostFailed, setMostFailed] = useState("");
  const [mostFailedTime, setMostFailedTime] = useState("");
  const [mostSuccessTime, setMostSuccessTime] = useState("");
  const [dashboardFilters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...salesforceToGitMergeSyncMetadata.newObjectFields },
      salesforceToGitMergeSyncMetadata,
      false,
    ),
  );

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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await taskActions.sfdcToGitMergeSyncBaseKPITable(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        filterDto,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
      );
      const { count, mostFailedTaskByCount, mostTimeTakingSuccessTask, mostTimeTakingFailedTask, list } = response.data.data
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", count);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && list) {
        setMetrics(list);
        setMostFailed(mostFailedTaskByCount);
        setMostSuccessTime(mostTimeTakingSuccessTask);
        setMostFailedTime(mostTimeTakingFailedTask);
        setFilters(dashboardFilters);
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

  return (
    <SalesforceToGitMergeBottomTable
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      kpiConfiguration={kpiConfiguration}
      dashboardData={dashboardData}
      dashboardFilters={dashboardFilters}
      mostFailed={mostFailed}
      mostSuccessTime={mostSuccessTime}
      mostFailedTime={mostFailedTime}
    />
  );
}

SalesforceToGitMergeTableOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SalesforceToGitMergeTableOverlay;
