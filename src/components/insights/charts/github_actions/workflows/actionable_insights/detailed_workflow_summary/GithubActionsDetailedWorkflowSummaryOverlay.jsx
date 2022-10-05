import React, {useContext} from "react";
import PropTypes from "prop-types";
import GithubActionsDetailedWorkflowSummaryDataBlocks from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummaryDataBlocks";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import GithubActionsDetailedWorkflowSummary
  from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummary";

// TODO: Pick better names for components and state variables
function GithubActionsDetailedWorkflowSummaryOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
    setCurrentScreen,
    setActionableInsight1DataObject,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };

  const getBody = () => {
    return (
      <div>
        <div className={"d-flex details-title-text p-2 mx-3"}>
          <div className={"mr-4"}>
            <b>Unique Workflow Name:</b> {workflowName}
          </div>
        </div>
        <div>
          <GithubActionsDetailedWorkflowSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
          />
          <GithubActionsDetailedWorkflowSummary
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
            setCurrentScreen={setCurrentScreen}
            setActionableInsight1DataObject={setActionableInsight1DataObject}
          />
        </div>
      </div>
    );
  };

  const getButtonContainer = () => {
    return (
      <div className={"mx-3"}>
        <ButtonContainerBase
          leftSideButtons={
            <BackButtonBase
              backButtonFunction={closePanel}
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
      titleText={`${workflowName}: Github Actions Detailed Workflow Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsDetailedWorkflowSummaryOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};

export default GithubActionsDetailedWorkflowSummaryOverlay;