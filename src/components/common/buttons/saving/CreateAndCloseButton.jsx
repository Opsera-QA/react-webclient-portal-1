import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {persistNewRecordAndClose} from "./saving-helpers";

function CreateAndCloseButton({recordDto, createRecord, disable, handleClose, showSuccessToasts, lenient, isSaving, setIsSaving}) {
  let toastContext = useContext(DialogToastContext);

  const persistRecord = async () => {
    setIsSaving(true);
    await persistNewRecordAndClose(recordDto, toastContext, showSuccessToasts, createRecord, lenient, handleClose);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Create ${recordDto.getType()} And Close`}</span>);
  };

  if (handleClose == null) {
    return <></>;
  }

  return (
    <div className="d-flex mx-1 px-2">
      <Button size="sm" variant="primary" disabled={isSaving || disable} onClick={() => persistRecord()}>
        {getLabel()}
      </Button>
    </div>
  );
}

CreateAndCloseButton.propTypes = {
  recordDto: PropTypes.object,
  createRecord: PropTypes.func,
  setIsSaving: PropTypes.func,
  isSaving: PropTypes.bool,
  disable: PropTypes.bool,
  handleClose: PropTypes.func,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

CreateAndCloseButton.defaultProps = {
  showSuccessToasts: true
}

export default CreateAndCloseButton;