import React, {useState} from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateAndCloseButton from "../CreateAndCloseButton";

function PersistButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose, addAnotherOption }) {
  const [isSaving, setIsSaving] = useState(false);

  const getSaveButton = () => {
    if (recordDto.isNew()){
      return (<CreateAndCloseButton createRecord={createRecord} handleClose={handleClose} recordDto={recordDto} setRecordDto={setRecordDto} 
        addAnotherOption={addAnotherOption} isSaving={isSaving} setIsSaving={setIsSaving}/>);
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

export default PersistButtonContainer;