import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateButton from "../CreateButton";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";

// TODO: If it makes sense, merge this with PersistButtonContainer
function PersistAndCloseButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose, addAnotherOption, disable, lenient, extraButtons }) {
  const getSaveButton = () => {
    if (recordDto.isNew()){
      return (
        <CreateButton
          createRecord={createRecord}
          handleClose={handleClose}
          recordDto={recordDto}
          setRecordDto={setRecordDto}
          addAnotherOption={addAnotherOption}
          disable={disable}
        />
      );
    }

    if (lenient) {
      return (<LenientSaveButton recordDto={recordDto} updateRecord={updateRecord} disable={disable} />);
    }

    return (<StrictSaveButton recordDto={recordDto} updateRecord={updateRecord} disable={disable} />);
  };

  // Don't show close button when using create modal. At least for now
  const getCloseButton = () => {
    if (handleClose) {
      return (
        <CloseEditorButton
          closeEditorCallback={handleClose}
          className={recordDto.isNew() ? "mt-auto mx-1" : undefined}
          dataModel={recordDto}
        />
      );
    }
  };

  return (
    <SaveButtonContainer extraButtons={extraButtons}>
      {getCloseButton()}
      {getSaveButton()}
    </SaveButtonContainer>
  );
}

PersistAndCloseButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  handleClose: PropTypes.func,
  disable: PropTypes.bool,
  addAnotherOption: PropTypes.bool,
  lenient: PropTypes.bool,
  extraButtons: PropTypes.any
};

PersistAndCloseButtonContainer.defaultProps = {
  addAnotherOption: true
};

export default PersistAndCloseButtonContainer;