import React, {useContext} from "react";
import PropTypes from "prop-types";
import GithubActionsUniqueRunSummaryDataBlocks from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/GithubActionsUniqueRunSummaryDataBlocks";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import GithubActionsUniqueRunSummaryDetailPanel
from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/GithubActionsUniqueRunSummaryDetailPanel";

function GithubActionsUniqueRunSummaryOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
    repoName,
    appName,
    workflow,
    branchName,
    jobName,
    workflowRuns,
    setCurrentScreen,
    setSelectedJobName,
    setSelectedWorkflowObject,
    breadcrumbBar,
  }) {
  const toastContext1 = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext1.removeInlineMessage();
    toastContext1.clearInfoOverlayPanel();
  };

  const handleBackButtonFunction = () => {
    setSelectedWorkflowObject(undefined);
    setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY);
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
      titleText={`${workflowName}: Github Actions Unique Run Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      {breadcrumbBar}
      <div>
        <div className={"p-2"}>
          <div className={"d-flex details-title-text"}>
            <div className={'mr-4'}>
              <b>Workflow Name:</b> {workflowName}
            </div>
            <div className={'mr-4'}>
              <b>Repository Name:</b> {repoName}
            </div>
            <div className={'mr-4'}>
              <b>Application Name:</b> {appName}
            </div>
            <div className={'mr-4'}>
              <b>Branch Name:</b> {branchName}
            </div>
            <div className={'mr-4'}>
              <b>Workflow Runs:</b> {workflowRuns}
            </div>
          </div>
        </div>
        <div>
          <GithubActionsUniqueRunSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
          />
          <GithubActionsUniqueRunSummaryDetailPanel
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
            setSelectedJobName={setSelectedJobName}
            setCurrentScreen={setCurrentScreen}
          />
        </div>
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsUniqueRunSummaryOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
  workflowRuns: PropTypes.string,
  setSelectedJobName: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setSelectedWorkflowObject: PropTypes.func,
  breadcrumbBar: PropTypes.any,
};

export default GithubActionsUniqueRunSummaryOverlay;