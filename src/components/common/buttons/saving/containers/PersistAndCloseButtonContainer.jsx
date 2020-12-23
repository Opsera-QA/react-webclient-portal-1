import React, {useState} from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "./SaveButtonContainer";
import StrictSaveButton from "../StrictSaveButton";
import CreateAndCloseButton from "../CreateAndCloseButton";

// TODO: Should we be going directly to dashboard screen? If so, remove this component and use PersistButtonContainer
function PersistAndCloseButtonContainer({ recordDto, setRecordDto, updateRecord, createRecord, handleClose, addAnotherOption }) {
  const [isSaving, setIsSaving] = useState(false);

  const getSaveButton = () => {
    if (recordDto.isNew()){
      return (
        <CreateAndCloseButton
          createRecord={createRecord}
          handleClose={handleClose}
          recordDto={recordDto}
          setRecordDto={setRecordDto}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
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

PersistAndCloseButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  handleClose: PropTypes.func,
};

export default PersistAndCloseButtonContainer;