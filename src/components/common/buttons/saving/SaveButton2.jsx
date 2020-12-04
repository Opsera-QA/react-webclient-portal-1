import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {DataState} from "../../../../core/data_model/model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {persistUpdatedRecord} from "./saving-helpers";

//TODO: Rename after old one is removed
function SaveButton2({recordDto, updateRecord, disable, showSuccessToasts, lenient}) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async () => {
    setIsSaving(true);
    await persistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Save`}</span>);
  };

  return (
    <div className="d-flex mx-1 px-1">
      <Button size="sm" variant="primary" disabled={isSaving || disable || (!lenient && !recordDto.isChanged())} onClick={() => persistRecord()}>
        {getLabel("Save")}
      </Button>
    </div>
  );
}

SaveButton2.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

SaveButton2.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default SaveButton2;