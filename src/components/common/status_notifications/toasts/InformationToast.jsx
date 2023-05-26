import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {Link} from "react-router-dom";

function InformationToast(
  {
    informationMessage,
    removeToast,
    autoCloseLength,
    id,
    link,
  }) {
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
      <div className="ml-auto">
        <IconBase
          icon={faTimes}
          className={"pointer information-toast-close-button"}
          onClickFunction={() => { clearToast(); }}
        />
      </div>
    );
  };

  const getItemLinkButton = () => {
    if (hasStringValue(link) === true) {
      return (
        <div className={"d-flex"}>
          <div className={"mr-3"}>
            <Link to={link}>View Item</Link>
          </div>
          <div className={"d-flex"}>
            <CopyToClipboardIconBase
              copyText={"Copy Link"}
              copiedText={"Copied Link"}
              copyString={`${process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL}${link}`}
            />
            <span className={"ml-2"}>Copy Link</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={"information-toast p-2"}
      role={"alert"}
      aria-live={"assertive"}
      aria-atomic={"true"}
    >
      <div className={"d-flex w-100"}>
        {messageBody}
        {getCloseButton()}
      </div>
      {getItemLinkButton()}
    </div>
  );
}

InformationToast.propTypes = {
  informationMessage: PropTypes.string,
  removeToast: PropTypes.func,
  id: PropTypes.string,
  autoCloseLength: PropTypes.number,
  link: PropTypes.string,
};

export default InformationToast;