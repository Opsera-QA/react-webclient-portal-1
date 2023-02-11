import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS
} from "components/tasks/details/tasks/sfdc-branch-structure/run/SalesforceBranchStructureTaskInitializationOverlay";
import TriggerGitToGitSyncTaskRunButton
  from "components/tasks/details/tasks/branch-to-branch/run/TriggerGitToGitSyncTaskRunButton";

export default function GitToGitSyncTaskRunTaskConfirmationScreen(
  {
    taskModel,
    setCurrentScreen,
    className,
  }) {
  const { toastContext } = useComponentStateReference();

  if (taskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"Trigger Task Run?"}
      />
      <div className={"mx-3 mb-3 mt-1"}>
        Do you want to run this Task: {taskModel?.getData("name")}?
      </div>
      <ButtonContainerBase
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={() => setCurrentScreen(SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN)}
          />
        }
      >
        <CancelButton
          size={"1x"}
          cancelFunction={toastContext.clearOverlayPanel}
        />
        <TriggerGitToGitSyncTaskRunButton
          taskModel={taskModel}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    </div>
  );
}

GitToGitSyncTaskRunTaskConfirmationScreen.propTypes = {
  taskModel: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};