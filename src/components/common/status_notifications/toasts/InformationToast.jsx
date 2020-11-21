import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function InformationToast({ informationMessage, removeToast, autoCloseLength, id }) {
  const [messageBody, setMessageBody] = useState("");
  const [autoCloseTimer, setAutoCloseTimer] = useState(undefined);

  useEffect(() => {
    setMessageBody(informationMessage);

    if (autoCloseLength != null) {
      autoHideDialog(autoCloseLength * 1000);
    }
  }, [informationMessage]);

  const clearToast = () => {
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
        <FontAwesomeIcon icon={faTimes} className="pointer information-toast-close-button" onClick={() => { clearToast(); }}/>
      </div>
    );
  };

  return (
    <div className="information-toast d-flex p-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div>
        {messageBody}
      </div>
      <div className="ml-auto my-auto">
        {getCloseButton()}
      </div>
    </div>
  );
}

InformationToast.propTypes = {
  informationMessage: PropTypes.string,
  removeToast: PropTypes.func,
  id: PropTypes.string,
  autoCloseLength: PropTypes.number
};

export default InformationToast;