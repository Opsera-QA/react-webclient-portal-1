import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {persistNewRecord} from "./saving-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";

function RegisterButton({recordDto, createAccount, disable, lenient}) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  const createOpseraAccount = async () => {
    setIsSaving(true);
    // TODO: Wire up inline banner on signup forms
    await persistNewRecord(recordDto, toastContext, false, createAccount, lenient, false);
    setIsSaving(false);
  };

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Creating Account...</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Register Account</span>);
  };

  return (
    <div className="mx-1">
      <Button size="sm" variant="success" id="login-button" className="register-button" disabled={isSaving || disable || !recordDto.checkCurrentValidity()} onClick={() => createOpseraAccount()}>
        {getLabel()}
      </Button>
    </div>
  );
}

RegisterButton.propTypes = {
  recordDto: PropTypes.object,
  createAccount: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

RegisterButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
};

export default RegisterButton;