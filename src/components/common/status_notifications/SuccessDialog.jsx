import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Rework
function SuccessDialog({ successMessage, setSuccessMessage, alignment }) {
  const [messageBody, setMessageBody] = useState("");

  const clearSuccess = () => {
      setSuccessMessage(() => {
        return false;
      });
  };

  useEffect(() => {
    setMessageBody(successMessage);
  }, [successMessage]);

  if (alignment === "top") {
    return (
      <div className="w-100 success-block top-error-block">
        {setSuccessMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearSuccess();}}/>
        </div>}
        <span>{messageBody}</span>
      </div>
    );
  }

  if (alignment === "dialogToast") {
    return (
      <div className="w-100 success-block top-dialog-block">
        {setSuccessMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearSuccess();}}/>
        </div>}
        <span>{messageBody}</span>
      </div>
    );
  }

  // TODO: Remove when toastContext is wired up everywhere on pipeline forms
  if (alignment === "stepConfigurationTop") {
    return (
      <div className="w-100 success-block step-configuration-dialog-block mt-2">
        <div className="my-auto text-center">
          {setSuccessMessage && <div className="float-right ml-1">
            <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearSuccess();}}/>
          </div>}
          <span>{messageBody}</span>
        </div>
      </div>
    );
  }

  // TODO: Remove when toastContext is wired up everywhere on detail panels
  if (alignment === "detailPanelTop") {
    return (
      <div className="row success-block top-dialog-detail-panel-block top-error-block">
        <div className="col-sm-12 my-auto text-center">
          {setSuccessMessage && <div className="float-right ml-1">
            <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearSuccess();}}/>
          </div>}
          <span>{messageBody}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-sm-12 my-auto text-center">
        {setSuccessMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearSuccess();}}/>
        </div>}
        <div className="success-text">
          <span>{messageBody}</span>
        </div>
      </div>
    </div>
  );

}

SuccessDialog.propTypes = {
  successMessage: PropTypes.string,
  setSuccessMessage: PropTypes.func,
  alignment: PropTypes.string,
  autoCloseDialog: PropTypes.bool
};

export default SuccessDialog;