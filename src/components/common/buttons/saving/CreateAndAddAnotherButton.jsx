import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {persistNewRecordAndAddAnother} from "./saving-helpers";

function CreateAndAddAnotherButton({recordDto, setRecordDto, createRecord, disable, showSuccessToasts, lenient, isSaving, setIsSaving}) {
  let toastContext = useContext(DialogToastContext);

  const persistRecord = async () => {
    setIsSaving(true);
    await persistNewRecordAndAddAnother(recordDto, toastContext, showSuccessToasts, createRecord, lenient, setRecordDto);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Create ${recordDto.getType()} And Add Another`}</span>);
  };

  if (setRecordDto == null) {
    return <></>;
  }

  return (
    <div className="mx-1">
      <Button size="sm" variant="primary" disabled={isSaving || disable} onClick={() => persistRecord()}>
        {getLabel()}
      </Button>
    </div>
  );
}

CreateAndAddAnotherButton.propTypes = {
  recordDto: PropTypes.object,
  setRecordDto: PropTypes.func,
  setIsSaving: PropTypes.func,
  isSaving: PropTypes.bool,
  createRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

CreateAndAddAnotherButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default CreateAndAddAnotherButton;