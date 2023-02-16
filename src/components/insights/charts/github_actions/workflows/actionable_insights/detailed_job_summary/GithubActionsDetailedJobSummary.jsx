import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { githubActionsWorkflowMetadata } from "components/insights/charts/github_actions/workflows/githubActionsWorkflow.metadata";
import { metricHelpers } from "components/insights/metric.helpers";
import githubActionsWorkflowActions from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import GithubActionsDetailedJobSummaryTable from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_job_summary/GithubActionsDetailedJobSummaryTable";

function GithubActionsDetailedJobSummary({
  kpiConfiguration,
  dashboardData,
  dashboardFilters,
  repoName,
  appName,
  workflowName,
  branchName,
  jobName,
}) {
  const [metrics, setMetrics] = useState([]);
  const [mostFailed, setMostFailed] = useState("");
  const [mostSkipped, setMostSkipped] = useState("");
  const [mostFailedTime, setMostFailedTime] = useState("");
  const [mostSuccessTime, setMostSuccessTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...githubActionsWorkflowMetadata.newObjectFields },
      githubActionsWorkflowMetadata,
      false,
    ),
  );
  const { toastContext, getAccessToken, cancelTokenSource, isMounted } =
    useComponentStateReference();

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
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(
        dashboardData?.data?.filters,
      );
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response =
        await githubActionsWorkflowActions.githubActionsActionableThreeTable(
          kpiConfiguration,
          getAccessToken,
          cancelTokenSource,
          filterDto,
          dashboardTags,
          dashboardOrgs,
          dashboardFilters,
          workflowName,
          repoName,
          appName,
          branchName,
          jobName,
        );

      let dataObject = response?.data ? response?.data?.data[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.count[0]?.count
        : [];
      let mostFailed = response?.data
        ? response?.data?.data[0]?.mostFailed[0]?.mostFailed
        : "N/A";
      let mostSkipped = response?.data
        ? response?.data?.data[0]?.mostSkipped[0]?.mostSkipped
        : "N/A";
      let mostSuccessTime = response?.data
        ? response?.data?.data[0]?.mostSuccessTime[0]?.mostSuccessTime
        : "N/A";
      let mostFailedTime = response?.data
        ? response?.data?.data[0]?.mostFailedTime[0]?.mostFailedTime
        : "N/A";

      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setMostFailed(mostFailed);
        setMostSkipped(mostSkipped);
        setMostSuccessTime(mostSuccessTime);
        setMostFailedTime(mostFailedTime);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Error pulling workflow metrics:",
        );
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <GithubActionsDetailedJobSummaryTable
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      kpiConfiguration={kpiConfiguration}
      dashboardData={dashboardData}
      repoName={repoName}
      workflowName={workflowName}
      branchName={branchName}
      appName={appName}
      jobName={jobName}
      mostFailed={mostFailed}
      mostSkipped={mostSkipped}
      mostSuccessTime={mostSuccessTime}
      mostFailedTime={mostFailedTime}
    />
  );
}

GithubActionsDetailedJobSummary.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
};

export default GithubActionsDetailedJobSummary;
