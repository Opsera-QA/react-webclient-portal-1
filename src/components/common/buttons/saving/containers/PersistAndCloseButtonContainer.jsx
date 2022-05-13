import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateButton from "../CreateButton";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import CloseEditorButton from "components/common/buttons/cancel/CloseEditorButton";

function PersistAndCloseButtonContainer(
  {
    recordDto,
    setRecordDto,
    updateRecord,
    createRecord,
    handleClose,
    addAnotherOption,
    disable,
    lenient,
    extraButtons,
    isIncomplete,
  }) {
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
          lenient={lenient}
          isIncomplete={isIncomplete}
        />
      );
    }

    if (lenient) {
      return (
        <LenientSaveButton
          recordDto={recordDto}
          updateRecord={updateRecord}
          disable={disable}
          isIncomplete={isIncomplete}
        />
      );
    }

    return (
      <StrictSaveButton
        recordDto={recordDto}
        updateRecord={updateRecord}
        disable={disable}
        isIncomplete={isIncomplete}
      />
    );
  };

  // Don't show close button when using create modal. At least for now
  const getCloseButton = () => {
    if (handleClose) {
      return (
        <CloseEditorButton
          closeEditorCallback={handleClose}
          className={recordDto.isNew() ? "mt-auto mx-1" : "mx-1"}
          dataModel={recordDto}
          setRecordDto={setRecordDto}
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

PersistAndCloseButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  handleClose: PropTypes.func,
  disable: PropTypes.bool,
  addAnotherOption: PropTypes.bool,
  lenient: PropTypes.bool,
  extraButtons: PropTypes.any,
  isIncomplete: PropTypes.bool,
};

PersistAndCloseButtonContainer.defaultProps = {
  addAnotherOption: true
};

export default PersistAndCloseButtonContainer;