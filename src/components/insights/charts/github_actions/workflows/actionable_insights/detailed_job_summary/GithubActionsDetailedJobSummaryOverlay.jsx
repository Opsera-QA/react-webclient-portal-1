import React, { useContext } from "react";
import PropTypes from "prop-types";
import GithubActionsDetailedJobSummaryDataBlocks from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_job_summary/GithubActionsDetailedJobSummaryDataBlocks";
import GithubActionsWorkflowActionableTableOverlay3 from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_job_summary/GithubActionsDetailedJobSummary";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CloseButton from "components/common/buttons/CloseButton";

function GithubActionsDetailedJobSummaryOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
    repoName,
    appName,
    branchName,
    jobName,
    runs,
    setCurrentScreen,
    setSelectedJobName,
    breadcrumbBar,
  }) {
  const toastContext1 = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext1.removeInlineMessage();
    toastContext1.clearInfoOverlayPanel();
  };

  const getBody = () => {
    return (
      <div>
        <div className={"p-2"}>
          <div className={"d-flex details-title-text"}>
            <div className={"mr-4"}>
              <b>Workflow Name:</b> {workflowName}
            </div>
            <div className={"mr-4"}>
              <b>Repository Name:</b> {repoName}
            </div>
            <div className={"mr-4"}>
              <b>Application Name:</b> {appName}
            </div>
            <div className={"mr-4"}>
              <b>Branch Name:</b> {branchName}
            </div>
            <div className={"mr-4"}>
              <b>Job Name:</b> {jobName}
            </div>
              {/*<div className={"mr-4"}>*/}
              {/*    <b>Job Runs:</b> {runs}*/}
              {/*</div>*/}
          </div>
        </div>
        <div>
          <GithubActionsDetailedJobSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            branchName={branchName}
            jobName={jobName}
          />
          <GithubActionsWorkflowActionableTableOverlay3
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            branchName={branchName}
            jobName={jobName}
          />
        </div>
      </div>
    );
  };

  const handleBackButtonFunction = () => {
    setSelectedJobName(undefined);
    setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY);
  };

  const getButtonContainer = () => {
    return (
      <div className={"mx-3"}>
        <ButtonContainerBase
          leftSideButtons={
            <BackButtonBase
              backButtonFunction={handleBackButtonFunction}
            />
          }
        >
          <CloseButton
            closeEditorCallback={closePanel}
          />
        </ButtonContainerBase>
      </div>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`${workflowName}: Github Actions Workflow Detailed Job Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      {breadcrumbBar}
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsDetailedJobSummaryOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
  runs: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedJobName: PropTypes.func,
  breadcrumbBar: PropTypes.any,
};

export default GithubActionsDetailedJobSummaryOverlay;