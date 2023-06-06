import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import SalesforceToGitMergeSyncDetailedRunSummaryDataBlocks from "./SalesforceToGitMergeSyncDetailedRunSummaryDataBlocks";
import SalesforceToGitMergeSyncDetailedRunSummary from "./SalesforceToGitMergeSyncDetailedRunSummary";

function SalesforceToGitMergeSyncDetailedRunSummaryOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
    setCurrentScreen,
    setSelectedRunObject,
    breadcrumbBar,
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
            <b>Task Name:</b> {taskName}
          </div>
        </div>
        <div>
          <SalesforceToGitMergeSyncDetailedRunSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            taskId={taskId}
          />
          <SalesforceToGitMergeSyncDetailedRunSummary
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            taskId={taskId}
            taskName={taskName}
            setCurrentScreen={setCurrentScreen}
            setSelectedRunObject={setSelectedRunObject}
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
      titleText={`Salesforce To Git Merge Task Run Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      {breadcrumbBar}
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceToGitMergeSyncDetailedRunSummaryOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedRunObject: PropTypes.func,
  breadcrumbBar: PropTypes.any,
  taskName: PropTypes.string,
};

export default SalesforceToGitMergeSyncDetailedRunSummaryOverlay;
