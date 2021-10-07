import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";
import VanityCreateButton from "components/common/buttons/saving/VanityCreateButton";
import VanitySaveButtonBase from "components/common/buttons/saving/VanitySaveButtonBase";

function PersistAndCloseVanityButtonContainer({ model, setModel, handleClose, disable, extraButtons }) {
  const getSaveButton = () => {
    if (model.isNew()){
      return (
        <VanityCreateButton
          handleClose={handleClose}
          model={model}
          setModel={setModel}
          disable={disable}
        />
      );
    }

    return (<VanitySaveButtonBase model={model} disable={disable} />);
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
    <SaveButtonContainer extraButtons={extraButtons}>
      {getSaveButton()}
      {getCloseButton()}
    </SaveButtonContainer>
  );
}

PersistAndCloseVanityButtonContainer.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  handleClose: PropTypes.func,
  disable: PropTypes.bool,
  extraButtons: PropTypes.any
};

export default PersistAndCloseVanityButtonContainer;