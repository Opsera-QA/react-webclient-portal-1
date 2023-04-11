import React from "react";
import PropTypes from "prop-types";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";
import VanityCreateButton from "components/common/buttons/saving/VanityCreateButton";
import VanitySaveButtonBase from "components/common/buttons/saving/VanitySaveButtonBase";
import DeleteModelButtonWithConfirmationOverlay from "components/common/buttons/delete/DeleteModelButtonWithConfirmationOverlay";
import Row from "react-bootstrap/Row";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

function VanityEditorPanelButtonContainer(
  {
    model,
    setModel,
    handleClose,
    showDeleteButton,
    disable,
    extraButtons,
    viewDetailsUponCreate,
    backButtonFunction,
  }) {
  const getDeleteButton = () => {
    if (showDeleteButton !== false) {
      return (
        <DeleteModelButtonWithConfirmationOverlay
          model={model}
          setModel={setModel}
          afterDeleteFunction={handleClose}
        />
      );
    }
  };

  const getSaveButton = () => {
    if (model.isNew()) {
      return (
        <VanityCreateButton
          handleClose={handleClose}
          model={model}
          setModel={setModel}
          disable={disable}
          viewDetailsUponCreate={viewDetailsUponCreate}
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
        <BackButtonBase
          backButtonFunction={backButtonFunction}
          className={"mr-2"}
        />
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
  extraButtons: PropTypes.any,
  showDeleteButton: PropTypes.bool,
  viewDetailsUponCreate: PropTypes.bool,
  backButtonFunction: PropTypes.func,
};

export default VanityEditorPanelButtonContainer;