import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {DataState} from "../../../../core/data_model/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {persistUpdatedRecord} from "./saving-helpers";

function SaveAndCloseButton({recordDto, updateRecord, disable, handleClose, showSuccessToasts, lenient}) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async () => {
    setIsSaving(true);
    await persistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient, handleClose);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Save ${recordDto.getType()} And Close`}</span>);
  };

  return (
    <div className="mx-1">
      <Button size="sm" variant="primary" disabled={isSaving || disable || recordDto.dataState === DataState.LOADED} onClick={() => persistRecord()}>
        {getLabel("Save")}
      </Button>
    </div>
  );
}

SaveAndCloseButton.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  handleClose: PropTypes.func,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

SaveAndCloseButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default SaveAndCloseButton;