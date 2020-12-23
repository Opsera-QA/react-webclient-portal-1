import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateButton from "../CreateButton";

function PersistButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose, addAnotherOption }) {
  const getSaveButton = () => {
    if (recordDto.isNew()){
      return (
        <CreateButton
          createRecord={createRecord}
          handleClose={handleClose}
          recordDto={recordDto}
          setRecordDto={setRecordDto}
          addAnotherOption={addAnotherOption}
        />
      );
    }

    return (<StrictSaveButton recordDto={recordDto} updateRecord={updateRecord} />);
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
  addAnotherOption: PropTypes.bool
};

PersistButtonContainer.defaultProps = {
  addAnotherOption: true
};

export default PersistButtonContainer;