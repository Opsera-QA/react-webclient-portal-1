import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateButton from "../CreateButton";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";

function PersistButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose, addAnotherOption, disable, lenient }) {
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

  return (
    <SaveButtonContainer>
      {getSaveButton()}
    </SaveButtonContainer>
  );
}

PersistButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  handleClose: PropTypes.func,
  disable: PropTypes.bool,
  addAnotherOption: PropTypes.bool,
  lenient: PropTypes.bool
};

PersistButtonContainer.defaultProps = {
  addAnotherOption: true
};

export default PersistButtonContainer;