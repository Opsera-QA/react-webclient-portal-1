import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import TriggerGitToGitSyncTaskRunButton
  from "components/tasks/details/tasks/branch-to-branch/run/TriggerGitToGitSyncTaskRunButton";
import {
  GIT_TO_GIT_SYNC_TASK_INITIALIZATION_SCREENS
} from "components/tasks/details/tasks/branch-to-branch/run/GitToGitSyncTaskInitializationOverlay";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

export default function GitToGitSyncTaskRunTaskConfirmationScreen(
  {
    taskModel,
    setCurrentScreen,
  }) {
  const {toastContext} = useComponentStateReference();

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase
        className={"mt-3"}
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={() => setCurrentScreen(GIT_TO_GIT_SYNC_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN)}
          />
        }
      >
        <CancelButton
          size={"1x"}
          cancelFunction={toastContext.clearOverlayPanel}
        />
        <TriggerGitToGitSyncTaskRunButton
          className={"ml-3"}
          taskModel={taskModel}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Git to Git Sync Task Initialization`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>
        <H5FieldSubHeader
          subheaderText={"Trigger Task Run?"}
        />
        <div className={"mx-3 mb-3 mt-1"}>
          Do you want to run this Task: {taskModel?.getData("name")}?
        </div>
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitToGitSyncTaskRunTaskConfirmationScreen.propTypes = {
  taskModel: PropTypes.object,
  setCurrentScreen: PropTypes.func,
};