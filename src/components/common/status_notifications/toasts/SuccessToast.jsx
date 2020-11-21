import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SuccessToast({ successMessage, removeToast, autoCloseLength, id }) {
  const [messageBody, setMessageBody] = useState("");
  const [autoCloseTimer, setAutoCloseTimer] = useState(undefined);

  useEffect(() => {
    setMessageBody(successMessage);
    autoHideDialog(autoCloseLength * 1000);
  }, [successMessage]);

  const clearSuccess = () => {
    if (autoCloseTimer != null) {
      clearTimeout(autoCloseTimer);
      setAutoCloseTimer(null);
    }

    removeToast(id);
  };

  function autoHideDialog(autoCloseLength = 20000) {
    setAutoCloseTimer(setTimeout(() => { removeToast(id); }, autoCloseLength));
  }

  const getCloseButton = () => {
    return (
      <div className="ml-1">
        <FontAwesomeIcon icon={faTimes} className="pointer green" onClick={() => { clearSuccess(); }}/>
      </div>
    );
  };

  return (
    <div className="success-toast d-flex p-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="text-white">
        {messageBody}
      </div>
      <div className="ml-auto my-auto">
        {getCloseButton()}
      </div>
    </div>
  );
}

SuccessToast.propTypes = {
  successMessage: PropTypes.string,
  removeToast: PropTypes.func,
  id: PropTypes.string,
  autoCloseLength: PropTypes.number
};

export default SuccessToast;