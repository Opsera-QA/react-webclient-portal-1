import React, {useContext} from "react";
import PropTypes from "prop-types";
import GithubActionsWorkflowActionableInsightDataBlocks1 from "./GithubActionsWorkflowActionableInsightDataBlocks1";
import GithubActionsWorkflowActionableTableOverlay1 from "./GithubActionsWorkflowActionableTableOverlay1";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";

// TODO: Pick better names for components and state variables
function GithubActionsWorkflowActionableInsight1(
  {
    kpiConfiguration,
    dashboardData,
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
        <div className="new-chart mb-3 mb-3 ml-3 all-github-actions-data-block">
          <GithubActionsWorkflowActionableInsightDataBlocks1 kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} workflowName={workflowName}/>
          <GithubActionsWorkflowActionableTableOverlay1
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
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
        <ButtonContainerBase>
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
      titleText={`Github Actions Detailed Workflow Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsWorkflowActionableInsight1.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};

export default GithubActionsWorkflowActionableInsight1;