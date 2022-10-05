import React, { useState } from "react";
import PropTypes from "prop-types";
import GithubActionsDetailedWorkflowSummaryOverlay
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummaryOverlay";
import GithubActionsWorkflowActionableInsight3
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/actionable_insights/detailed_job_summary/GithubActionsWorkflowActionableInsight3";
import GithubActionsUniqueRunSummaryOverlay
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/actionable_insights/unique_run_summary/GithubActionsUniqueRunSummaryOverlay";

export const GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS = {
  GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY: "github_actions_detailed_workflow_summary",
  GITHUB_ACTIONS_WORKFLOW_JOB_SUMMARY: "github_actions_workflow_job_summary",
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
  const [actionableInsight1DataObject, setActionableInsight1DataObject] = useState(undefined);
  const [selectedJobName, setSelectedJobName] = useState(undefined);
  const [selectedJobRuns, setSelectedJobRuns] = useState(undefined);


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
            setActionableInsight1DataObject={setActionableInsight1DataObject}
          />
        );
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_JOB_SUMMARY:
        return (
          <GithubActionsUniqueRunSummaryOverlay
            workflowName={workflowName}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            appName={actionableInsight1DataObject?.appName}
            repoName={actionableInsight1DataObject?.repoName}
            workflow={actionableInsight1DataObject?.workflow}
            branchName={actionableInsight1DataObject?.branchName}
            workflowRuns={actionableInsight1DataObject?.runs}
            setSelectedJobName={setSelectedJobName}
            setCurrentScreen={setCurrentScreen}
            setActionableInsight1DataObject={setActionableInsight1DataObject}
          />
        );
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY:
        return (
          <GithubActionsWorkflowActionableInsight3
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            appName={actionableInsight1DataObject?.appName}
            repoName={actionableInsight1DataObject?.repoName}
            workflow={actionableInsight1DataObject?.workflow}
            workflowName={actionableInsight1DataObject?.workflow}
            branchName={actionableInsight1DataObject?.branchName}
            jobName={selectedJobName}
            runs={selectedJobRuns}
            setCurrentScreen={setCurrentScreen}
            setSelectedJobName={setSelectedJobName}
            setSelectedJobRuns={setSelectedJobRuns}
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
