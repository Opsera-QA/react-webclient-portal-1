import React, { useState } from "react";
import PropTypes from "prop-types";
import GithubActionsWorkflowActionableInsight1
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsights/ActionableInsights1/GithubActionsWorkflowActionableInsight1";
import GithubActionsWorkflowActionableInsights2
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsights/ActionableInsights2/GithubActionsWorkflowActionableInsights2";
import GithubActionsWorkflowActionableInsight3
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsights/ActionableInsights3/GithubActionsWorkflowActionableInsight3";

export const GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS = {
  GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY: "github_actions_detailed_workflow_summary",
  GITHUB_ACTIONS_WORKFLOW_JOB_SUMMARY: "github_actions_workflow_job_summary",
  GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY: "github_actions_workflow_step_summary",
};

export default function GithubActionsWorkflowActionableInsightOverlay(
  {
    kpiConfiguration,
    dashboardData,
    workflowName,
  }) {
  const [currentScreen, setCurrentScreen] = useState(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY);
  const [actionableInsight1DataObject, setActionableInsight1DataObject] = useState(undefined);
  const [selectedJobName, setSelectedJobName] = useState(undefined);


  const getBody = () => {
    switch (currentScreen) {
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY:
        return (
          <GithubActionsWorkflowActionableInsight1
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            workflowName={workflowName}
            setCurrentScreen={setCurrentScreen}
            setActionableInsight1DataObject={setActionableInsight1DataObject}
          />
        );
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_JOB_SUMMARY:
        return (
          <GithubActionsWorkflowActionableInsights2
            workflowName={workflowName}
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
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
            appName={actionableInsight1DataObject?.appName}
            repoName={actionableInsight1DataObject?.repoName}
            workflow={actionableInsight1DataObject?.workflow}
            workflowName={actionableInsight1DataObject?.workflow}
            branchName={actionableInsight1DataObject?.branchName}
            jobName={selectedJobName}
            setCurrentScreen={setCurrentScreen}
            setSelectedJobName={setSelectedJobName}
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
  workflowName: PropTypes.string,
};
