import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import InfoContainer from "components/common/containers/InfoContainer";

function DeleteConfirmationPanel(
  {
    model,
    handleClose,
    deleteDataFunction,
    deleteButton,
    subPanel,
  }) {
  const getDeleteButton = () => {
    if (deleteButton) {
      return deleteButton;
    }

    return (
      <DeleteButton
        dataObject={model}
        deleteRecord={deleteDataFunction}
        size={"md"}
      />
    );
  };

  const getSubPanel = () => {
    if (subPanel) {
      return (
        <div className={"my=2"}>
          {subPanel}
        </div>
      );
    }
  };

  if (model == null || (deleteDataFunction == null && deleteButton == null)) {
    return null;
  }

  return (
    <InfoContainer
      titleText={`Confirm ${model?.getType()} Delete`}
      titleIcon={faTrash}
    >
      <div className="m-3">
        <div className="mb-2">
          <div>Data cannot be recovered once this {model?.getType()} is deleted.</div>
          <div>Do you still want to proceed?</div>
        </div>
        {getSubPanel()}
        <SaveButtonContainer>
          <CancelButton size={"md"} className={"mx-2"} cancelFunction={handleClose}/>
          {getDeleteButton()}
        </SaveButtonContainer>
      </div>
    </InfoContainer>
  );
}

DeleteConfirmationPanel.propTypes = {
  model: PropTypes.object,
  deleteButton: PropTypes.object,
  handleClose: PropTypes.func,
  subPanel: PropTypes.any,
  deleteDataFunction: PropTypes.func,
};

export default DeleteConfirmationPanel;


