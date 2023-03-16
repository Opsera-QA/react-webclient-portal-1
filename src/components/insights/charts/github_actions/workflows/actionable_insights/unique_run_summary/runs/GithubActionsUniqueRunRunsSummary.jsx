import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {githubActionsWorkflowMetadata} from "components/insights/charts/github_actions/workflows/githubActionsWorkflow.metadata";
import {metricHelpers} from "components/insights/metric.helpers";
import githubActionsWorkflowActions from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import GithubActionsUniqueRunSummaryRunsTable
  from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/runs/GithubActionsUniqueRunSummaryRunsTable";

function GithubActionsUniqueRunRunsSummary(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    repoName,
    appName,
    workflow,
    branchName,
    setCurrentScreen,
    setSelectedJobName,
  }) {
  const [metrics, setMetrics] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...githubActionsWorkflowMetadata.newObjectFields },
      githubActionsWorkflowMetadata,
      false
    )
  );
  const {
    getAccessToken,
    isMounted,
    cancelTokenSource,
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
      const response = await githubActionsWorkflowActions.getGithubActionsActionableOneTableWorkflowRunDetails(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        filterDto,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        workflow,
        repoName,
        appName,
        branchName
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
    <GithubActionsUniqueRunSummaryRunsTable
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      dashboardFilters={dashboardFilters}
      appName={appName}
      stats={stats}
      setCurrentScreen={setCurrentScreen}
      setSelectedJobName={setSelectedJobName}
    />
  );
}

GithubActionsUniqueRunRunsSummary.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedJobName: PropTypes.func,
};

export default GithubActionsUniqueRunRunsSummary;
