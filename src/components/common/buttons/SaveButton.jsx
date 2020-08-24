import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import {DataState} from "../../../core/data_model/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";

function SaveButton({recordDto, type, createRecord, updateRecord, altButtonText}) {
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async (persistFunction) => {
    setIsSaving(true);
    await persistFunction();
    setIsSaving(false);
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
          <Button size="sm" variant="primary" disabled={isSaving} onClick={() => persistRecord(createRecord)}><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{altButtonText ? altButtonText : "Create " + type}</Button>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="d-flex">
          {isSaving && <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving is in progress</div>}
          <Button size="sm" variant="primary" disabled={isSaving || recordDto.dataState === DataState.LOADED} onClick={() => persistRecord(updateRecord)}><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</Button>
        </div>
      </>
    );
  }
}

SaveButton.propTypes = {
  recordDto: PropTypes.object,
  type: PropTypes.string,
  createRecord: PropTypes.func,
  updateRecord: PropTypes.func
};

export default SaveButton;