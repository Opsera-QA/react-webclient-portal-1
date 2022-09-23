import React, {useContext} from "react";
import PropTypes from "prop-types";
import GithubActionsWorkflowActionableInsightDataBlocks2 from "./GithubActionsWorkflowActionableInsightsDataBlock2";
import GithubActionsWorkflowActionableTableOverlay2 from "./GithubActionsWorkflowActionableTableOverlay2";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsightOverlay";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

function GithubActionsWorkflowActionableInsight2(
  {
    kpiConfiguration,
    dashboardData,
    workflowName,
    repoName,
    appName,
    workflow,
    branchName,
    jobName,
    workflowRuns,
    setCurrentScreen,
    setSelectedJobName,
    setActionableInsight1DataObject,
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
        <div className="new-chart mb-3 mb-3 ml-3 all-github-actions-data-block">
          <GithubActionsWorkflowActionableInsightDataBlocks2
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
          />
          <GithubActionsWorkflowActionableTableOverlay2
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
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
    );
  };

  const handleBackButtonFunction = () => {
    setActionableInsight1DataObject(undefined);
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
      titleText={`Github Actions Workflow Job Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsWorkflowActionableInsight2.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
  workflowRuns: PropTypes.string,
  setSelectedJobName: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};

export default GithubActionsWorkflowActionableInsight2;