import React, {useContext} from "react";
import PropTypes from "prop-types";
import GithubActionsDetailedWorkflowSummaryDataBlocks from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummaryDataBlocks";
import GithubActionsWorkflowActionableTableOverlay1 from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/actionable_insights/detailed_workflow_summary/GithubActionsDetailedWorkflowSummary";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

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
        <div className={"p-2"}>
          <div className={"d-flex details-title-text"}>
            <div className={'mr-4'}>
              <b>Unique Workflow Name:</b> {workflowName}
            </div>
          </div>
        </div>
        <div className="new-chart m-3">
          <GithubActionsDetailedWorkflowSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            workflowName={workflowName}
          />
          <GithubActionsWorkflowActionableTableOverlay1
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
      titleText={`${workflowName}: Detailed Workflow Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
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