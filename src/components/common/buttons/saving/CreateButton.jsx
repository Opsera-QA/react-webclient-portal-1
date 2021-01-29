import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {
  persistNewRecord,
  persistNewRecordAndAddAnother,
  persistNewRecordAndClose,
  persistNewRecordAndViewDetails
} from "./saving-helpers";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateButton({recordDto, createRecord, disable, showSuccessToasts, lenient, setRecordDto, addAnotherOption, handleClose}) {
  const [isSaving, setIsSaving] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const history = useHistory();
  let toastContext = useContext(DialogToastContext);

  const persistRecord = async () => {
    setIsSaving(true);

    if (addAnother) {
      await persistNewRecordAndAddAnother(recordDto, toastContext, showSuccessToasts, createRecord, lenient, setRecordDto);
      setIsSaving(false);
    }
    else if (recordDto.getDetailViewLink() != null) {
      let response = await persistNewRecordAndViewDetails(recordDto, toastContext, showSuccessToasts, createRecord, lenient, history);

      if (response === false) {
        setIsSaving(false);
      }
    }
    else if (handleClose != null) {
      let response = await persistNewRecordAndClose(recordDto, toastContext, showSuccessToasts, createRecord, lenient, handleClose);

      if (response === false) {
        setIsSaving(false);
      }
    }
    else {
      await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient);
      setIsSaving(false);
    }
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Create ${recordDto.getType()}`}</span>);
  };

  const getAddAnotherCheckbox = () => {
    if (addAnotherOption) {
      return (
        <div className="d-flex mr-3 mt-auto">
          <div><span className="text-muted mr-2">Add Another</span></div>
          <div><input className="mt-1" type="checkbox" checked={addAnother} onChange={() => setAddAnother(!addAnother)} /></div>
        </div>
      );
    }
  };

  return (
    <div className="px-2 d-flex">
      {getAddAnotherCheckbox()}
      {/*TODO: Make sure button is not clickable until form is valid*/}
      <Button size="sm" variant="primary" disabled={isSaving || disable} onClick={() => persistRecord()}>
        {getLabel()}
      </Button>
    </div>
  );
}

CreateButton.propTypes = {
  recordDto: PropTypes.object,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  handleClose: PropTypes.func,
  lenient: PropTypes.bool,
  addAnotherOption: PropTypes.bool
};

CreateButton.defaultProps = {
  showSuccessToasts: true,
  addAnotherOption: true
}

export default CreateButton;