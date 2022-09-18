import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeleteOverlayBase from "components/common/overlays/center/delete/DeleteOverlayBase";
import { useHistory } from "react-router-dom";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import taskActions from "components/tasks/task.actions";

export default function DeleteTaskConfirmationOverlay(
  {
    taskModel,
    refreshAfterDeletion,
  }) {
  const history = useHistory();
  const [deleteState, setDeleteState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  const handleTaskDeletionFunction = async () => {
    try {
      setDeleteState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await taskActions.deleteGitTaskV2(getAccessToken, cancelTokenSource, taskModel);
      toastContext.showSystemSuccessToast("Successfully Deleted Task");
      setDeleteState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      toastContext.clearOverlayPanel();

      if (refreshAfterDeletion === true) {
        history.push(history.location);
      } else {
        history.goBack();
      }
    } catch (error) {
      if (isMounted?.current === true) {
        setDeleteState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showDeleteFailureResultDialog("Task", error);
      }
    }
  };

  return (
    <DeleteOverlayBase
      objectType={"Task"}
      deleteState={deleteState}
      handleDeleteFunction={handleTaskDeletionFunction}
    />
  );
}

DeleteTaskConfirmationOverlay.propTypes = {
  taskModel: PropTypes.object,
  refreshAfterDeletion: PropTypes.bool,
};


