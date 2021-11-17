import React from "react";
import PropTypes from "prop-types";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";
import VanityCreateButton from "components/common/buttons/saving/VanityCreateButton";
import VanitySaveButtonBase from "components/common/buttons/saving/VanitySaveButtonBase";
import DeleteModelButtonWithConfirmation from "components/common/buttons/delete/DeleteModelButtonWithConfirmationModal";
import Row from "react-bootstrap/Row";

function VanityEditorPanelButtonContainer({ model, setModel, handleClose, disable, extraButtons }) {
  const getDeleteButton = () => {
    return (
      <DeleteModelButtonWithConfirmation
        model={model}
        afterDeleteFunction={handleClose}
      />
    );
  };

  const getSaveButton = () => {
    if (model.isNew()) {
      return (
        <VanityCreateButton
          handleClose={handleClose}
          model={model}
          setModel={setModel}
          disable={disable}
        />
      );
    }

    return (
      <VanitySaveButtonBase
        model={model}
        disable={disable}
      />
    );
  };

  const getCloseButton = () => {
    if (handleClose) {
      return (
        <CloseEditorButton
          closeEditorCallback={handleClose}
          className={"ml-2"}
          dataModel={model}
        />
      );
    }
  };

  return (
    <Row className="mx-0 mt-3 d-flex">
      <div className={"d-flex"}>
        {getDeleteButton()}
        {extraButtons}
      </div>
      <div className="ml-auto d-flex">
        {getSaveButton()}
        {getCloseButton()}
      </div>
    </Row>
  );
}

VanityEditorPanelButtonContainer.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  handleClose: PropTypes.func,
  disable: PropTypes.bool,
  extraButtons: PropTypes.any
};

export default VanityEditorPanelButtonContainer;