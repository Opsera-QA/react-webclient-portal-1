import React, { useState } from "react";
import PropTypes from "prop-types";
import GithubActionsDetailedWorkflowSummaryOverlay
  from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummaryOverlay";
import GithubActionsDetailedJobSummaryOverlay
  from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_job_summary/GithubActionsDetailedJobSummaryOverlay";
import GithubActionsUniqueRunSummaryOverlay
  from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/GithubActionsUniqueRunSummaryOverlay";
import GithubActionsWorkflowActionableInsightSubNavigationBar
  from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightSubNavigationBar";

export const GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS = {
  GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY: "github_actions_detailed_workflow_summary",
  GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY: "github_actions_workflow_unique_run_summary",
  GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY: "github_actions_workflow_step_summary",
};

export default function GithubActionsWorkflowActionableInsightOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
  }) {
  const [currentScreen, setCurrentScreen] = useState(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY);
  const [selectedWorkflowObject, setSelectedWorkflowObject] = useState(undefined);
  const [selectedJobName, setSelectedJobName] = useState(undefined);
  const [selectedJobRuns, setSelectedJobRuns] = useState(undefined);

  const getBreadcrumbBar = () => {
    return (
      <GithubActionsWorkflowActionableInsightSubNavigationBar
        setCurrentScreen={setCurrentScreen}
        currentScreen={currentScreen}
        setSelectedWorkflowObject={setSelectedWorkflowObject}
        setSelectedJobName={setSelectedJobName}
        setSelectedJobRuns={setSelectedJobRuns}
      />
    );
  };

  const getBody = () => {
    switch (currentScreen) {
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY:
        return (
          <GithubActionsDetailedWorkflowSummaryOverlay
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            setCurrentScreen={setCurrentScreen}
            setSelectedWorkflowObject={setSelectedWorkflowObject}
            breadcrumbBar={getBreadcrumbBar()}
          />
        );
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY:
        return (
          <GithubActionsUniqueRunSummaryOverlay
            workflowName={workflowName}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            appName={selectedWorkflowObject?.appName}
            repoName={selectedWorkflowObject?.repoName}
            workflow={selectedWorkflowObject?.workflow}
            branchName={selectedWorkflowObject?.branchName}
            workflowRuns={selectedWorkflowObject?.runs}
            setSelectedJobName={setSelectedJobName}
            setCurrentScreen={setCurrentScreen}
            setSelectedWorkflowObject={setSelectedWorkflowObject}
            breadcrumbBar={getBreadcrumbBar()}
          />
        );
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY:
        return (
          <GithubActionsDetailedJobSummaryOverlay
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            appName={selectedWorkflowObject?.appName}
            repoName={selectedWorkflowObject?.repoName}
            workflow={selectedWorkflowObject?.workflow}
            workflowName={selectedWorkflowObject?.workflow}
            branchName={selectedWorkflowObject?.branchName}
            jobName={selectedJobName}
            runs={selectedJobRuns}
            setCurrentScreen={setCurrentScreen}
            setSelectedJobName={setSelectedJobName}
            setSelectedJobRuns={setSelectedJobRuns}
            breadcrumbBar={getBreadcrumbBar()}
          />
        );
    }
  };

  return (
    <>
      {getBody()}
    </>
  );
}

GithubActionsWorkflowActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
};
