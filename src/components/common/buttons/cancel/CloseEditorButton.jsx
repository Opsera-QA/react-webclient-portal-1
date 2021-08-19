import React from "react";
import PropTypes from "prop-types";
import CloseButton from "components/common/buttons/CloseButton";

function CloseEditorButton({ dataModel, isLoading, closeEditorCallback, size, className, showUnsavedChangesMessage, setRecordDto }) {
  const handleClose = () => {
    if (dataModel) {
      dataModel?.resetData();

      if (setRecordDto) {
        setRecordDto({...dataModel});
      }
    }

    closeEditorCallback();
  };


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
  dataModel: PropTypes.object,
  setRecordDto: PropTypes.func
};

export default CloseEditorButton;