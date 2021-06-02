import React from "react";
import PropTypes from "prop-types";
import CloseButton from "../../CloseButton";
import PipelineStepConfigurationSaveButtonContainer from "./PipelineStepConfigurationSaveButtonContainer";
import LenientSaveButton from "../LenientSaveButton";

// TODO: This will probably be removed if we make an actual detail view or if we do the modal concept where we have the tabs
function PipelineStepConfigurationButtonContainer({ recordDto, persistRecord, disable, handleClose }) {
  return (
    <PipelineStepConfigurationSaveButtonContainer>
      <LenientSaveButton recordDto={recordDto} updateRecord={persistRecord} disable={disable} />
      <CloseButton recordDto={recordDto} closeEditorCallback={handleClose}  />
    </PipelineStepConfigurationSaveButtonContainer>
  );
}

PipelineStepConfigurationButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  persistRecord: PropTypes.func,
  handleClose: PropTypes.func,
  disable: PropTypes.bool
};

export default PipelineStepConfigurationButtonContainer;