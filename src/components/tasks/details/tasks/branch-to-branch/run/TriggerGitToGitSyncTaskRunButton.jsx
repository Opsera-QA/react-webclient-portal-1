import React from 'react';
import PropTypes from "prop-types";
import { faPlay } from "@fortawesome/pro-light-svg-icons";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useButtonState from "hooks/general/buttons/useButtonState";
import taskActions from "components/tasks/task.actions";

export default function TriggerGitToGitSyncTaskRunButton(
  {
    taskModel,
    className,
    disabled,
  }) {
  const {
    buttonState,
    buttonStateFunctions,
  } = useButtonState();
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const handleRunGitTask = async () => {
    try {
      buttonStateFunctions.setBusyState();
      await taskActions.triggerGitToGitSyncRequest( getAccessToken, cancelTokenSource, taskModel?.getMongoDbId());
      closePanel();
      buttonStateFunctions.setSuccessState();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      buttonStateFunctions.setErrorState();
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskModel == null) {
    return (<LoadingDialog size={"sm"} />);
  }

  return (
    <div className={className}>
      <VanityButtonBase
        className={className}
        buttonState={buttonState}
        icon={faPlay}
        disabled={taskModel?.getData("status") === "running" || disabled}
        onClickFunction={handleRunGitTask}
        variant={"success"}
        normalText={"Run Task"}
        busyText={"Starting Task"}
        errorText={"Failed to Start Task!"}
        successText={"Successfully Triggered Task"}
      />
    </div>
  );
}

TriggerGitToGitSyncTaskRunButton.propTypes = {
  taskModel: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
