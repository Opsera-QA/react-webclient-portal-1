import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { githubActionsWorkflowMetadata } from "components/insights/charts/github_actions/workflows/githubActionsWorkflow.metadata";
import GithubActionsDetailedWorkflowSummaryTable from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummaryTable";
import { metricHelpers } from "components/insights/metric.helpers";
import githubActionsWorkflowActions from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function GithubActionsDetailedWorkflowSummary(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
    setCurrentScreen,
    setActionableInsight1DataObject,
  }) {
  const [metrics, setMetrics] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...githubActionsWorkflowMetadata.newObjectFields },
      githubActionsWorkflowMetadata,
      false,
    ),
  );
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      //let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsActionableOneTable(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        filterDto,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        workflowName,
      );
      let dataObject = response?.data ? response?.data?.data[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.count[0]?.count
        : [];
      let stats = response?.data?.stats;

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setStats(stats);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error pulling workflow metrics:");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <GithubActionsDetailedWorkflowSummaryTable
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      workflowName={workflowName}
      dashboardFilters={dashboardFilters}
      stats={stats}
      setCurrentScreen={setCurrentScreen}
      setActionableInsight1DataObject={setActionableInsight1DataObject}
    />
  );
}

GithubActionsDetailedWorkflowSummary.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};
