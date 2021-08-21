import React from "react";
import PropTypes from "prop-types";
import CloseButton from "../../CloseButton";
import PipelineStepConfigurationSaveButtonContainer from "./PipelineStepConfigurationSaveButtonContainer";
import LenientSaveButton from "../LenientSaveButton";
import StrictSaveButton from "components/common/buttons/saving/StrictSaveButton";

// TODO: This will probably be removed if we make an actual detail view or if we do the modal concept where we have the tabs
function PipelineStepConfigurationButtonContainer({ recordDto, persistRecord, handleClose, isStrict, disableSaveButton }) {

  const getSaveButton = () => {
    if (isStrict === true) {
      return (<StrictSaveButton disable={disableSaveButton} recordDto={recordDto} updateRecord={persistRecord} />);
    }

    return (<LenientSaveButton disable={disableSaveButton} recordDto={recordDto} updateRecord={persistRecord} />);
  };

  return (
    <PipelineStepConfigurationSaveButtonContainer>
      {getSaveButton()}
      <CloseButton recordDto={recordDto} closeEditorCallback={handleClose} className={"mx-1"}  />
    </PipelineStepConfigurationSaveButtonContainer>
  );
}

PipelineStepConfigurationButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  persistRecord: PropTypes.func,
  handleClose: PropTypes.func,
  isStrict: PropTypes.bool,
  disableSaveButton: PropTypes.bool,
};

export default PipelineStepConfigurationButtonContainer;