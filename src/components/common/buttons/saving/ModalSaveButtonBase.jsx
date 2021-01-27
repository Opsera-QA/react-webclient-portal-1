import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {modalPersistUpdatedRecord, persistUpdatedRecord} from "./saving-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";

function ModalSaveButtonBase({recordDto, updateRecord, disable, showSuccessToasts, lenient}) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async () => {
    setIsSaving(true);
    await modalPersistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-1"/>Save</span>);
  };

  return (
    <div className="mx-1">
      <Button size="sm" variant="primary" disabled={isSaving || disable || (!lenient && !recordDto.isChanged())} onClick={() => persistRecord()}>
        {getLabel()}
      </Button>
    </div>
  );
}

ModalSaveButtonBase.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

ModalSaveButtonBase.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default ModalSaveButtonBase;