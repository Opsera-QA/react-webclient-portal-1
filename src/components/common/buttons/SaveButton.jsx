import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import Model, {DataState} from "../../../core/data_model/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import {useHistory} from "react-router-dom";

function SaveButton({recordDto, setRecordDto, setData, createRecord, updateRecord, altButtonText, type, disable, handleClose, showCreateAnother, showViewDetails, modal, showToasts}) {
  let toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async (persistFunction, createAnother = false, goToDetails = false) => {
    setIsSaving(true);
    let isNew = recordDto.isNew();

    try {
      if(!recordDto.isModelValid2()) {
        let errors = recordDto.isModelValid();
        console.error(errors);
        toastContext.showFormValidationErrorDialog(isNew && modal, errors && errors.length > 0 ? errors[0] : undefined);
        return;
      }

      let response = await persistFunction();

      if (isNew) {
        if (showToasts)
        {
          toastContext.showCreateSuccessResultDialog(getType(), createAnother);
        }

        if (setData && createAnother) {
          let newModel = new Model({...recordDto.getNewObjectFields()}, recordDto.getMetaData(), true);
          await setRecordDto(newModel);
        }
        else if (goToDetails && recordDto.getDetailViewLink != null) {
          let updatedDto = new Model(response.data, recordDto.getMetaData(), false);
          let link = updatedDto.getDetailViewLink();
          console.log("link: " + link);
          history.push(link);
        }
      }
      else {
        if (showToasts)
        {
          toastContext.showUpdateSuccessResultDialog(getType());
        }

        if (setData && createAnother) {
          let updatedDto = new Model(response.data, recordDto.getMetaData(), false);
          await setData(updatedDto);
          await setRecordDto(updatedDto);
        }
      }

      if (!createAnother && isNew && handleClose) {
        handleClose();
      }
    }
    catch (error) {
      console.error(error);

      // Always show error toasts?
      if (isNew) {
        toastContext.showCreateFailureResultDialog(getType(), error);
      }
      else {
        toastContext.showUpdateFailureResultDialog(getType(), error);
      }
    }
    finally {
      setIsSaving(false);
    }
  }

  const getType = () => {
    return type != null ? type : recordDto.getType();
  }

  // TODO: Implement
  const prepareNewModel = async () => {
    await persistRecord(createRecord, true);
  }

  // TODO: Implement
  const goToDetails = async () => {
    await persistRecord(createRecord, false, true);
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
          {/*TODO: When all modals are hooked up, change to Create and Close*/}
          <Button size="sm" variant="primary" disabled={isSaving || disable} onClick={() => persistRecord(createRecord)}><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{altButtonText ? altButtonText : "Create " + getType()}{setRecordDto && " And Close"}</Button>
          {showCreateAnother && setRecordDto && <Button size="sm" className="mx-2" variant="primary" disabled={isSaving || recordDto.dataState === DataState.LOADED || disable} onClick={() => prepareNewModel(updateRecord)}><FontAwesomeIcon icon={faSave} fixedWidth/>Create And Add Another</Button>}
          {showViewDetails && recordDto.getDetailViewLink != null && <Button size="sm" variant="primary" disabled={isSaving || recordDto.dataState === DataState.LOADED || disable} onClick={() => goToDetails()}><FontAwesomeIcon icon={faSave} fixedWidth/>Create And View Details</Button>}
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
  disable: PropTypes.bool,
  setRecordDto: PropTypes.func,
  handleClose: PropTypes.func,
  showCreateAnother: PropTypes.bool,
  showViewDetails: PropTypes.bool,
  modal: PropTypes.bool,
  showToasts: PropTypes.bool
};

SaveButton.defaultProps = {
  disable: false,
  showCreateAnother: false,
  showViewDetails: false,
  modal: true,
  showToasts: true
}

export default SaveButton;