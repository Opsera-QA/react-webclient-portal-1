import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {parseError} from "../../helpers/error-helpers";
import IconBase from "components/common/icons/IconBase";

function ErrorToast({ error, prependMessage, removeToast, autoCloseLength, id }) {
  const [messageBody, setMessageBody] = useState("");
  const [autoCloseTimer, setAutoCloseTimer] = useState(undefined);
  const [statusCode, setStatusCode] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
    setStatusCode(error && error.response ? error.response.status : null);

    if (autoCloseLength != null) {
      autoHideDialog(autoCloseLength * 1000);
    }
  }, [error]);


  const reloadSession = function() {
    window.location.reload();
  };

  const clearError = () => {
    if (autoCloseTimer != null) {
      clearTimeout(autoCloseTimer);
      setAutoCloseTimer(null);
    }

    removeToast(id);
  };

  function autoHideDialog(autoCloseLength = 20000) {
    setAutoCloseTimer(setTimeout(() => { clearError(); }, autoCloseLength));
  }

  const getCloseButton = () => {
    if (removeToast) {
      return (
        <div className={"ml-auto"}>
          <IconBase
            icon={faTimes}
            className="pointer danger-red"
            onClickFunction={() => { clearError(); }}
          />
        </div>
      );
    }
  };

  const getCustomMessage = () => {
    if (statusCode === 401 || (messageBody && messageBody.includes("401"))) {
      return (
        <span>
          <a style={{textDecoration: "underline"}} href="#" onClick={() => { reloadSession(); }}>Click here to renew session.</a>
        </span>
      );
    }
  };

  return (
    <div className="error-toast d-flex" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="error-toast-text p-2">
        <span>{prependMessage} {messageBody} {getCustomMessage()}</span>
      </div>
      {getCloseButton()}
    </div>
  );
}

ErrorToast.propTypes = {
  error: PropTypes.object,
  removeToast: PropTypes.func,
  prependMessage: PropTypes.string,
  id: PropTypes.string,
  autoCloseLength: PropTypes.number
};

export default ErrorToast;