import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function WarningToast({ warningMessage, removeToast, autoCloseLength, id }) {
  const [messageBody, setMessageBody] = useState("");
  const [autoCloseTimer, setAutoCloseTimer] = useState(undefined);

  useEffect(() => {
    setMessageBody(warningMessage);

    if (autoCloseLength != null) {
      autoHideDialog(autoCloseLength * 1000);
    }
  }, [warningMessage]);

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
      <div className="ml-auto">
        <IconBase
          icon={faTimes}
          className="pointer warning-toast-close-button"
          onClickFunction={() => { clearToast(); }}
        />
      </div>
    );
  };

  return (
    <div className="warning-toast d-flex" role="alert" aria-live="assertive" aria-atomic="true">
      <div className={"p-2"}>
        {messageBody}
      </div>
      {getCloseButton()}
    </div>
  );
}

WarningToast.propTypes = {
  warningMessage: PropTypes.string,
  removeToast: PropTypes.func,
  id: PropTypes.string,
  autoCloseLength: PropTypes.number
};

export default WarningToast;