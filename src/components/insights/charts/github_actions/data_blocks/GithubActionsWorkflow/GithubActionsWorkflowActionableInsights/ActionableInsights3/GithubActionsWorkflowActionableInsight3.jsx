import React, { useContext } from "react";
import PropTypes from "prop-types";
import GithubActionsWorkflowActionableInsightDataBlocks3 from "./GithubActionsWorkflowActionableInsightDataBlocks3";
import GithubActionsWorkflowActionableTableOverlay3 from "./GithubActionsWorkflowActionableTableOverlay3";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsightOverlay";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CloseButton from "components/common/buttons/CloseButton";

function GithubActionsWorkflowActionableInsight3(
  {
    kpiConfiguration,
    dashboardData,
    workflowName,
    repoName,
    appName,
    branchName,
    jobName,
    setCurrentScreen,
    setSelectedJobName,
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
          </div>
        </div>
        <div className="new-chart mb-3 mb-3 ml-3 all-github-actions-data-block">
          <GithubActionsWorkflowActionableInsightDataBlocks3
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            branchName={branchName}
            jobName={jobName}
          />
          <GithubActionsWorkflowActionableTableOverlay3
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
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
    setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_JOB_SUMMARY);
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
      titleText={`Github Actions Workflow Step Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsWorkflowActionableInsight3.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedJobName: PropTypes.func,
};

export default GithubActionsWorkflowActionableInsight3;