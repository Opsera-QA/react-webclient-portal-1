import React, {useState} from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import CreateAndCloseButton from "../CreateAndCloseButton";
import CreateAndAddAnotherButton from "../CreateAndAddAnotherButton";
import CreateAndViewDetailsButton from "../CreateAndViewDetailsButton";
import StrictSaveButton from "../StrictSaveButton";

// TODO: Don't use. Use Persist button container instead
function CreateAndSaveButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose }) {
  const [isSaving, setIsSaving] = useState(false);

  if (recordDto.isNew()){
    return (
      <SaveButtonContainer>
        <CreateAndViewDetailsButton recordDto={recordDto} createRecord={createRecord} isSaving={isSaving} setIsSaving={setIsSaving}/>
        <CreateAndAddAnotherButton recordDto={recordDto} createRecord={createRecord} setRecordDto={setRecordDto} isSaving={isSaving} setIsSaving={setIsSaving} />
        <CreateAndCloseButton recordDto={recordDto} createRecord={createRecord} handleClose={handleClose} isSaving={isSaving} setIsSaving={setIsSaving} />
      </SaveButtonContainer>
    )
  }

  return (
    <SaveButtonContainer>
      <StrictSaveButton recordDto={recordDto} updateRecord={updateRecord} />
    </SaveButtonContainer>
  );
}

CreateAndSaveButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  handleClose: PropTypes.func
};

export default CreateAndSaveButtonContainer;