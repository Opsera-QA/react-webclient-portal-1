import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

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
      <div className="ml-auto">
        <IconBase
          icon={faTimes}
          className="pointer green"
          onClickFunction={() => { clearSuccess();}}
        />
      </div>
    );
  };

  return (
    <div className="success-toast d-flex" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="success-toast-text p-2">
        {messageBody}
      </div>
      {getCloseButton()}
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