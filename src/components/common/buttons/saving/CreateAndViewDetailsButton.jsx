import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {persistNewRecordAndViewDetails} from "./saving-helpers";
import {useHistory} from "react-router-dom";

function CreateAndViewDetailsButton({recordDto, createRecord, disable, showSuccessToasts, lenient}) {
  let toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async () => {
    setIsSaving(true);
    await persistNewRecordAndViewDetails(recordDto, toastContext, showSuccessToasts, createRecord, lenient, history);
    setIsSaving(false);
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>{`Create ${recordDto.getType()} And Add Another`}</span>);
  };

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
  createRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool
};

CreateAndViewDetailsButton.defaultProps = {
  disable: false,
  showSuccessToasts: true
}

export default CreateAndViewDetailsButton;