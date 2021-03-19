import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {persistUpdatedRecord} from "./saving-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";

function SaveButtonBase({recordDto, updateRecord, disable, size, showSuccessToasts, lenient, className, saveButtonText}) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);


  const persistRecord = async () => {
    setIsSaving(true);
    await persistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient);

    if (isMounted.current === true) {
      setIsSaving(false);
    }
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-1"/>{saveButtonText}</span>);
  };

  return (
    <div className={className}>
      <Button size={size} variant="primary" disabled={isSaving || disable || (!lenient && !recordDto.isChanged())} onClick={() => persistRecord()}>
        {getLabel()}
      </Button>
    </div>
  );
}

SaveButtonBase.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  size: PropTypes.string,
  lenient: PropTypes.bool,
  className: PropTypes.string,
  saveButtonText: PropTypes.string
};

SaveButtonBase.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true,
  saveButtonText: "Save"
}

export default SaveButtonBase;