import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import {DataState} from "../../../core/data_model/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";

function SaveButton({recordDto, createRecord, updateRecord, altButtonText, type, disable}) {
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async (persistFunction) => {
    setIsSaving(true);
    await persistFunction();
    setIsSaving(false);
  }

  const getType = () => {
    return type != null ? type : recordDto.getType();
  }

  // TODO: Disable button with record is not valid
  // TODO: Put saving message in button like this

  {/*<Button variant="primary" type="button" disabled={isSaving}*/}
  {/*  onClick={() => { callbackFunction(); }}> */}
  {/*  {isSaving ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : <FontAwesomeIcon icon={faSave} className="mr-1"/>} Save*/}
  {/*</Button>*/}
  if (recordDto.isNew()) {
    return (
      <>
        <div className="d-flex">
          {isSaving && <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving is in progress</div>}
          <Button size="sm" variant="primary" disabled={isSaving || disable} onClick={() => persistRecord(createRecord)}><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{altButtonText ? altButtonText : "Create " + getType()}</Button>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="d-flex">
          {isSaving && <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving is in progress</div>}
          <Button size="sm" variant="primary" disabled={isSaving || recordDto.dataState === DataState.LOADED || disable} onClick={() => persistRecord(updateRecord)}><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</Button>
        </div>
      </>
    );
  }
}

SaveButton.propTypes = {
  recordDto: PropTypes.object,
  type: PropTypes.string, // TODO: Remove when everything is hooked up with metadata
  createRecord: PropTypes.func,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool
};

SaveButton.defaultProps = {
  disable: false
}

export default SaveButton;