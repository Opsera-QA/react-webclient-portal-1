import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

// Note: this should only be used in special cases where Model-Wrapped objects don't make sense
function StandaloneSaveButton({saveFunction, disable, type}) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  const persistRecord = async () => {
    try {
      setIsSaving(true);
      await saveFunction();
      toastContext.showSaveSuccessToast(type);
    }
    catch (error) {
      toastContext.showSaveFailureToast(type, error);
    }
    finally {
      setIsSaving(false);
    }
  }

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</span>);
    }

    return (<span><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</span>);
  };

  return (
    <div className="d-flex">
      <Button size="sm" disabled={isSaving || disable} onClick={() => persistRecord()}>
        {getLabel()}
      </Button>
    </div>
  );
}

StandaloneSaveButton.propTypes = {
  saveFunction: PropTypes.func,
  disable: PropTypes.bool,
  type: PropTypes.string
};

StandaloneSaveButton.defaultProps = {
  disable: false,
}

export default StandaloneSaveButton;