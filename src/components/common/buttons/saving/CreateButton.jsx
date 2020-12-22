import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import { persistNewRecordAndAddAnother, persistNewRecordAndViewDetails } from "./saving-helpers";
import {useHistory} from "react-router-dom";

function CreateButton({recordDto, createRecord, disable, showSuccessToasts, lenient, setRecordDto, addAnotherOption}) {
  const [isSaving, setIsSaving] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const history = useHistory();
  let toastContext = useContext(DialogToastContext);

  const persistRecord = async () => {
    setIsSaving(true);

    if (addAnother) {
      await persistNewRecordAndAddAnother(recordDto, toastContext, showSuccessToasts, createRecord, lenient, setRecordDto);
    } else {
      await persistNewRecordAndViewDetails(recordDto, toastContext, showSuccessToasts, createRecord, lenient, history);
    }

    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Create ${recordDto.getType()}`}</span>);
  };

  return (
    <div className="px-2">
      {addAnotherOption && <div className="d-flex mr-2 mb-2">
        <div><span className="text-muted mr-2">Add Another</span></div>
        <div><input className="mt-1" type="checkbox" checked={addAnother} onClick={() => setAddAnother(!addAnother)} /></div>
      </div>}
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
  lenient: PropTypes.bool,
  addAnotherOption: PropTypes.bool
};

CreateButton.defaultProps = {
  showSuccessToasts: true
}

export default CreateButton;