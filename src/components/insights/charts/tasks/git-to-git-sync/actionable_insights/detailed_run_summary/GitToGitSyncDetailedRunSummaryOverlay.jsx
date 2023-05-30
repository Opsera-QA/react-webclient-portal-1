import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import GitToGitSyncDetailedRunSummaryDataBlocks from "./GitToGitSyncDetailedRunSummaryDataBlocks";
import GitToGitSyncDetailedRunSummary from "./GitToGitSyncDetailedRunSummary";

function GitToGitSyncDetailedRunSummaryOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
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
          <GitToGitSyncDetailedRunSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            taskId={taskId}
          />
          <GitToGitSyncDetailedRunSummary
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            taskId={taskId}
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
      titleText={`Git To Git Sync Task Run Summary`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      {breadcrumbBar}
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

GitToGitSyncDetailedRunSummaryOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  breadcrumbBar: PropTypes.any,
  taskName: PropTypes.string,
};

export default GitToGitSyncDetailedRunSummaryOverlay;
