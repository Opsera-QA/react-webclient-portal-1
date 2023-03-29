import React from "react";
import PropTypes from "prop-types";
import CloseButton from "components/common/buttons/CloseButton";
import PipelineStepConfigurationSaveButtonContainer from "components/common/buttons/saving/containers/PipelineStepConfigurationSaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import StrictSaveButton from "components/common/buttons/saving/StrictSaveButton";

// TODO: This will probably be removed if we make an actual detail view or if we do the modal concept where we have the tabs
function PipelineStepConfigurationButtonContainer(
  {
    recordDto,
    persistRecord,
    handleClose,
    isStrict,
    disableSaveButton,
    showIncompleteDataMessage,
    showSuccessToasts,
    clearChangeMapAfterSave,
    customIncompleteDataMessage,
    customSuccessMessage,
  }) {

  const getSaveButton = () => {
    if (isStrict === true) {
      return (
        <StrictSaveButton
          disable={disableSaveButton}
          recordDto={recordDto}
          updateRecord={persistRecord}
          showSuccessToasts={showSuccessToasts}
          clearChangeMapAfterSave={clearChangeMapAfterSave}
          customSuccessMessage={customSuccessMessage}
        />
      );
    }

    return (
      <LenientSaveButton
        disable={disableSaveButton}
        recordDto={recordDto}
        updateRecord={persistRecord}
        showIncompleteDataMessage={showIncompleteDataMessage}
        showSuccessToasts={showSuccessToasts}
        customIncompleteDataMessage={customIncompleteDataMessage}
        customSuccessMessage={customSuccessMessage}
      />
    );
  };

  return (
    <PipelineStepConfigurationSaveButtonContainer>
      {getSaveButton()}
      <CloseButton className={"mx-1"} recordDto={recordDto} closeEditorCallback={handleClose}  />
    </PipelineStepConfigurationSaveButtonContainer>
  );
}

PipelineStepConfigurationButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  persistRecord: PropTypes.func,
  handleClose: PropTypes.func,
  isStrict: PropTypes.bool,
  disableSaveButton: PropTypes.bool,
  showIncompleteDataMessage: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  clearChangeMapAfterSave: PropTypes.bool,
  customIncompleteDataMessage: PropTypes.string,
  customSuccessMessage: PropTypes.string,
};

export default PipelineStepConfigurationButtonContainer;