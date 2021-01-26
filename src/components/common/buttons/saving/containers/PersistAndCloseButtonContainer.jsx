import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateButton from "../CreateButton";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import CloseButton from "components/common/buttons/CloseButton";

// TODO: If it makes sense, merge this with PersistButtonContainer
function PersistAndCloseButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose, addAnotherOption, disable, lenient }) {
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
      return (<LenientSaveButton recordDto={recordDto} updateRecord={updateRecord} disable={disable} />)
    }

    return (<StrictSaveButton recordDto={recordDto} updateRecord={updateRecord} disable={disable} />);
  };

  // Don't show close button when using create modal. At least for now
  const getCloseButton = () => {
    if (!recordDto.isNew()) {
      return (<CloseButton closeEditorCallback={handleClose}/>);
    }
  };

  return (
    <SaveButtonContainer>
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
  lenient: PropTypes.bool
};

PersistAndCloseButtonContainer.defaultProps = {
  addAnotherOption: true
};

export default PersistAndCloseButtonContainer;