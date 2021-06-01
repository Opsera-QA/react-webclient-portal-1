import React from "react";
import PropTypes from "prop-types";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";
import PersistAndCloseVanityButtonContainer
  from "components/common/buttons/saving/containers/PersistAndCloseVanityButtonContainer";

function VanityEditorPanelContainer({ children, isLoading, model, setModel, handleClose, disable, extraButtons }) {
  const getRequiredFieldsMessage = () => {
    if (model?.showRequiredFieldsMessage() === true) {
      return (<RequiredFieldsMessage />);
    }
  };

  const getPersistButtonContainer = () => {
    return (
      <PersistAndCloseVanityButtonContainer
        extraButtons={extraButtons}
        handleClose={handleClose}
        disable={disable}
        model={model}
        setModel={setModel}
      />
    );
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (model == null) {
    return null;
  }

  return (
    <div className="p-3 h-100">
      <div>{children}</div>
      <div>
        <div>{getPersistButtonContainer()}</div>
        <div>{getRequiredFieldsMessage()}</div>
      </div>
    </div>
  );
}

VanityEditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool,
  handleClose: PropTypes.func,
  setModel: PropTypes.func,
  model: PropTypes.object,
  lenient: PropTypes.bool,
  disable: PropTypes.bool,
  extraButtons: PropTypes.any
};

export default VanityEditorPanelContainer;