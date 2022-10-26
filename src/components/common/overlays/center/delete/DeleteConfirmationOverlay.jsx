import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { DialogToastContext } from "contexts/DialogToastContext";
import DeleteOverlayBase from "components/common/overlays/center/delete/DeleteOverlayBase";

export default function DeleteConfirmationOverlay(
  {
    type,
    titleIcon,
    closePanelFunction,
    handleDeleteFunction,
    buttonContainer,
    deleteButtonDisabled,
    afterDeleteFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [deleteState, setDeleteState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const handleDelete = async () => {
    setDeleteState(buttonLabelHelper.BUTTON_STATES.BUSY);

    try {
      const response = await handleDeleteFunction();
      toastContext.showDeleteSuccessResultDialog(type);
      setDeleteState(buttonLabelHelper.BUTTON_STATES.SUCCESS);

      if (afterDeleteFunction) {
        afterDeleteFunction();
      }

      toastContext.clearOverlayPanel();
      return response;
    } catch (error) {
      setDeleteState(buttonLabelHelper.BUTTON_STATES.ERROR);
      toastContext.showDeleteFailureResultDialog(type, error);
    }
  };

  return (
    <DeleteOverlayBase
      objectType={type}
      handleDeleteFunction={handleDelete}
      deleteState={deleteState}
      titleIcon={titleIcon}
      closePanelFunction={closePanelFunction}
      buttonContainer={buttonContainer}
      deleteButtonDisabled={deleteButtonDisabled}
    />
  );
}

DeleteConfirmationOverlay.propTypes = {
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  closePanelFunction: PropTypes.func,
  buttonContainer: PropTypes.func,
  handleDeleteFunction: PropTypes.func,
  deleteButtonDisabled: PropTypes.bool,
  afterDeleteFunction: PropTypes.func,
};

