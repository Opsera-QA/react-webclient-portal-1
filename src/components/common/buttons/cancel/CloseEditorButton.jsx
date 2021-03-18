import React from "react";
import PropTypes from "prop-types";
import CloseButton from "components/common/buttons/CloseButton";

function CloseEditorButton({ dataModel, isLoading, closeEditorCallback, size, className, showUnsavedChangesMessage }) {
  const handleClose = () => {
    if (dataModel) {
      dataModel.resetData();
    }

    closeEditorCallback();
  }


  if (closeEditorCallback == null) {
    return null;
  }

  return (
    <CloseButton
      closeEditorCallback={handleClose}
      isLoading={isLoading}
      size={size}
      className={className}
      showUnsavedChangesMessage={showUnsavedChangesMessage}
    />
  );
}

CloseEditorButton.propTypes = {
  closeEditorCallback: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  showUnsavedChangesMessage: PropTypes.bool,
  dataModel: PropTypes.object
};

export default CloseEditorButton;