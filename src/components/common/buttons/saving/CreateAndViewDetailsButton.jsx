import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {persistNewRecordAndViewDetails} from "./saving-helpers";
import {useHistory} from "react-router-dom";

// TODO: Remove when everything is using CreateButton
function CreateAndViewDetailsButton({recordDto, createRecord, disable, showSuccessToasts, lenient, isSaving, setIsSaving}) {
  let toastContext = useContext(DialogToastContext);
  const history = useHistory();

  const persistRecord = async () => {
    setIsSaving(true);
    await persistNewRecordAndViewDetails(recordDto, toastContext, showSuccessToasts, createRecord, lenient, history);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Create ${recordDto.getType()} And View Details`}</span>);
  };

  if (recordDto.getDetailViewLink() === null) {
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

CreateAndViewDetailsButton.propTypes = {
  recordDto: PropTypes.object,
  setIsSaving: PropTypes.func,
  isSaving: PropTypes.bool,
  createRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

CreateAndViewDetailsButton.defaultProps = {
  showSuccessToasts: true
}

export default CreateAndViewDetailsButton;