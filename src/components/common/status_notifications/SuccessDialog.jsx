import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} onClick={() => {
            clearSuccess();
          }}/>
        </div>}
        <span>{messageBody}</span>
      </div>
    );
  }

  if (alignment === "detailPanelTop") {
    return (
      <div className="row success-block top-dialog-detail-panel-block top-error-block">
        <div className="col-sm-12 my-auto text-center">
          {setSuccessMessage && <div className="float-right ml-1">
            <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} onClick={() => {
              clearSuccess();
            }}/>
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
          <FontAwesomeIcon icon={faTimes} style={{ cursor: "pointer" }} onClick={() => {
            clearSuccess();
          }}/>
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
};

export default SuccessDialog;