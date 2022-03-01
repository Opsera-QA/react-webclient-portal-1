import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Clean up code once dialogs are completed
function WarningDialog({warningMessage, setWarningMessage, alignment}) {
  const [messageBody, setMessageBody] = useState("");

  const clearWarning = () => {
    setWarningMessage(() => {
      return false;
    });
  };

  useEffect(() => {
    setMessageBody(warningMessage);
  }, [warningMessage]);

  function hideDialog() {
    if (setWarningMessage) {
      setTimeout(function () {
        clearWarning();
      }, 5000);
    }
  }

  if (alignment === "top") {
    return (
      <div className="w-100 warning-block top-error-block">
        {setWarningMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearWarning();}}/>
        </div>}
        <span>{messageBody}</span>
      </div>
    );
  }

  if (alignment === "dialogToast") {
    return (
      <div className="w-100 warning-block top-dialog-block">
        {setWarningMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearWarning();}}/>
        </div>}
        <span>{messageBody}</span>
      </div>
    );
  }

  if (alignment === "toolRegistryWarning") {
    return (
      <div className="row">
        <div className="warning-block border-radius-5px tool-registry-dialog-block mt-1">
          {setWarningMessage && (
            <div className="float-right ml-1">
              <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearWarning();}}/>
            </div>
          )}
          <div>
            <span>{messageBody}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-sm-12 my-auto warning-block text-center p-2">
        {setWarningMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearWarning();}}/>
        </div>}
        <div>
          <span>{messageBody}</span>
        </div>
      </div>
    </div>
  );

}

WarningDialog.propTypes = {
  warningMessage: PropTypes.string,
  setWarningMessage: PropTypes.string,
  alignment: PropTypes.string,
  autoCloseDialog: PropTypes.bool
};

WarningDialog.defaultProps = {
  autoCloseDialog: true
};

export default WarningDialog;