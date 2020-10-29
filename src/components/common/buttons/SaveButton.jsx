import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import Model, {DataState} from "../../../core/data_model/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import {useHistory} from "react-router-dom";

// TODO: This button will be repurposed or removed once distinct buttons and a save bar is created and implemented
function SaveButton({recordDto, setRecordDto, setData, createRecord, updateRecord, altButtonText, type, disable, handleClose, showCreateAnother, showViewDetails, modal, showToasts, loginButton}) {
  let toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async (persistFunction, createAnother = false, goToDetails = false) => {
    setIsSaving(true);
    let isNew = recordDto.isNew();

    try {
      if(!recordDto.isModelValid2()) {
        let errors = recordDto.isModelValid();
        console.error(JSON.stringify(errors));
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

  const prepareNewModel = async () => {
    await persistRecord(createRecord, true);
  }

  const goToDetails = async () => {
    await persistRecord(createRecord, false, true);
  }

  // TODO: Disable button with record is not valid
  // TODO: Come up with better name
  if (loginButton) {
    return (
    isSaving ?
      (
        <Button id="login-button" disabled={true} variant="outline-success" className="mr-2 px-4" type="button">
          <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth />Creating Account...</span>
        </Button>
      )
      :
      (
        <Button size="md" className="register-button mx-auto" id="login-button" type="submit" variant="success" onClick={() => persistRecord(createRecord)}>
          <span>Register Account</span>
        </Button>
      )
    );
  }


  {/*TODO: When all modals are hooked up, change to always say Create and Close*/}
  const getCreateAndCloseButton = () => {
    return (
      <Button size="sm" variant="primary" disabled={isSaving || disable} onClick={() => persistRecord(createRecord)}>
        {isSaving
          ? <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Creating</span>
          : <span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{altButtonText ? altButtonText : "Create " + getType()}{setRecordDto && modal && " And Close"}</span>
        }
      </Button>
    );
  };

  const getCreateAndAddAnotherButton = () => {
    return (
      <Button size="sm" className="mx-2" variant="primary" disabled={isSaving || recordDto.dataState === DataState.LOADED || disable} onClick={() => prepareNewModel(updateRecord)}>
        {isSaving
          ? <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Creating</span>
          : <span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Create And Add Another</span>
        }

      </Button>
    )
  };

  const getCreateAndViewDetailsButton = () => {
    return (
      <Button size="sm" variant="primary" disabled={isSaving || recordDto.dataState === DataState.LOADED || disable} onClick={() => goToDetails()}>
        {isSaving
          ? <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Creating</span>
          : <span><FontAwesomeIcon icon={faSave} className="mr-2" fixedWidth/>Create And View Details</span>
        }
      </Button>
    );
  };

  if (recordDto.isNew()) {
    return (
      <>
        <div className="d-flex">
          {getCreateAndCloseButton()}
          {showCreateAnother && setRecordDto && getCreateAndAddAnotherButton()}
          {showViewDetails && recordDto.getDetailViewLink != null && getCreateAndViewDetailsButton()}
        </div>
      </>
    );
  }

  return (
    <div className="d-flex mr-2 px-2 py-1">
      <Button size="sm" variant="primary"
              disabled={isSaving || recordDto.dataState === DataState.LOADED || disable}
              onClick={() => persistRecord(updateRecord)}
      >
        {isSaving
          ? <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>
          : <span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</span>
        }
      </Button>
    </div>
  );
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
  showToasts: PropTypes.bool,
  loginButton: PropTypes.bool,
  altButtonText: PropTypes.string
};

SaveButton.defaultProps = {
  disable: false,
  showCreateAnother: false,
  showViewDetails: false,
  modal: true,
  showToasts: true
}

export default SaveButton;