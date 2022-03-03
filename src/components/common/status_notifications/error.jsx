import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

/**
 * @param {*} { error, align, type }
 * error: Is a string of either "sm" or "lg" with "sm" being just a centered icon, and large being full screen
 * align: center to do a vertical centering of the parent DIV or empty for inline
 * type: passes the "variant" value from Bootstrap of danger, warning, info, etc.
 * @returns
 */
// TODO: Rename props and use React JSX standards for file name in separate merge request
function ErrorDialog({ error, align, setError, prependMessage }) {
  const [messageBody, setMessageBody] = useState(undefined);
  const [detailedError, setDetailedError] = useState(undefined);
  const [statusCode, setStatusCode] = useState(undefined);

  const reloadSession = function() {
    window.location.reload();
  };

  const clearError = () => {
    setError(() => {
      return false;
    });
  };

  useEffect(() => {
    const messageBody = processError(error);

    setMessageBody(messageBody);
    setDetailedError(JSON.stringify(error));
    setStatusCode(error && error.response ? error.response.status : null);

  }, [error]);

  const processError = (e) => {
    if (!e || e.length === 0) {
      return "Unknown error reported.  Please check console log.";
    }
    console.error(e); //log all errors to console

    if (typeof e === "string") {
      return e;
    }

    if (typeof e === "object") {
      if (e.error) {
        if (e.error.message) {
          return e.error.message;
        }
        return JSON.stringify(e.error);
      }

      if (e.response) {
        let messageBody = `Status ${e.response.status}: `;
        messageBody += e.response.data.message ? e.response.data.message : JSON.stringify(e.response.data);
        return messageBody;
      }

      if (e.message) {
        return e.message;
      }

      return JSON.stringify(e);
    }
  };

  if (error === null || error === "") {
    return null;
  }

  if (align === "center") {
    return (
      <div className="row h-100">
        <div className="col-sm-12 my-auto text-center">
          <div className="error-text">
            {prependMessage} {messageBody} {(statusCode === 401 || (messageBody && messageBody.includes("401"))) &&
          <span className="ml-1"><a href="#" onClick={() => {
            reloadSession();
          }}>Click here to renew session.</a></span>}
          </div>
        </div>
      </div>
    );
  }

  if (align === "dialogToast") {
    return (
      <div className="w-100 error-block top-dialog-block">
        {setError && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearError();}}/>
        </div>}
        {prependMessage} {messageBody} {(statusCode === 401 || (messageBody && messageBody.includes("401"))) &&
      <span className="ml-1"><a style={{ color: "#fff", textDecoration: "underline" }} href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    );
  }

  // TODO: Remove when toastContext is wired up everywhere on detail panels
  if (align === "detailPanelTop") {
    return (/*removed this class: top-dialog-detail-panel-block*/
      <div className="w-100 error-block top-error-block">
        {setError && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearError();}}/>
        </div>}
        {prependMessage} {messageBody} {(statusCode === 401 || (messageBody && messageBody.includes("401"))) &&
      <span className="ml-1"><a style={{ color: "#fff", textDecoration: "underline" }} href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    );
  }

  // TODO: Remove when toastContext is wired up everywhere on pipeline forms
  if (align === "stepConfigurationTop") {
    return (
      <div className="w-100 error-block step-configuration-dialog-block mt-1">
        {setError && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearError();}}/>
        </div>}
        {prependMessage} {messageBody} {(statusCode === 401 || (messageBody && messageBody.includes("401"))) &&
      <span className="ml-1"><a style={{ color: "#fff", textDecoration: "underline" }} href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    );
  }

  if (align === "top") {
    return (
      <div className="w-100 error-block top-error-block">
        {setError && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearError();}}/>
        </div>}
        {prependMessage} {messageBody} {(statusCode === 401 || (messageBody && messageBody.includes("401"))) &&
      <span className="ml-1"><a style={{ color: "#fff", textDecoration: "underline" }} href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    );
  }

  return (
    <div className="mx-3 my-3 max-content-module-width-50">
      <div className="error-text">
        {prependMessage} {messageBody} {(statusCode === 401 || (messageBody && messageBody.includes("401"))) &&
      <span className="ml-1"><a href="#" onClick={() => {
        reloadSession();
      }}>Click here to renew session.</a></span>}
      </div>
    </div>
  );


}

ErrorDialog.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  align: PropTypes.string,
  setError: PropTypes.func,
  prependMessage: PropTypes.string,
};

ErrorDialog.defaultProps = {
  align: "inline",
  type: "danger",
};

export default ErrorDialog;
