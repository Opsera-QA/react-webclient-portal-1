import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import DeleteOverlayBase from "components/common/overlays/center/delete/DeleteOverlayBase";
import { useHistory } from "react-router-dom";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function DeletePipelineConfirmationOverlay(
  {
    pipeline,
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

  const handlePipelineDeletionFunction = async () => {
    try {
      setDeleteState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await pipelineActions.deletePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      toastContext.showSystemSuccessToast("Successfully Deleted Pipeline");
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
        toastContext.showDeleteFailureResultDialog("Pipeline", error);
      }
    }
  };

  return (
    <DeleteOverlayBase
      objectType={"Pipeline"}
      deleteState={deleteState}
      handleDeleteFunction={handlePipelineDeletionFunction}
    />
  );
}

DeletePipelineConfirmationOverlay.propTypes = {
  pipeline: PropTypes.object,
  refreshAfterDeletion: PropTypes.bool,
};


