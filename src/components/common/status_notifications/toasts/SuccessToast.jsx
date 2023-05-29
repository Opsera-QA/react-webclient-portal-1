import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ToastLinkBar from "components/common/status_notifications/toasts/ToastLinkBar";

function SuccessToast(
  {
    successMessage,
    removeToast,
    autoCloseLength,
    id,
    link,
  }) {
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

    <div
      className={"opsera-toast success-toast p-2"}
      role={"alert"}
      aria-live={"assertive"}
      aria-atomic={"true"}
    >
      <div className={"d-flex w-100"}>
        {messageBody}
        {getCloseButton()}
      </div>
      <ToastLinkBar link={link} />
    </div>
  );
}

SuccessToast.propTypes = {
  successMessage: PropTypes.string,
  removeToast: PropTypes.func,
  id: PropTypes.string,
  autoCloseLength: PropTypes.number,
  link: PropTypes.string,
};

export default SuccessToast;