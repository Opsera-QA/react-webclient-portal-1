import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import {parseError} from "../../helpers/error-helpers";
import IconBase from "components/common/icons/IconBase";

function ErrorBanner({ error, id, removeBanner, prependMessage }) {
  const [messageBody, setMessageBody] = useState(undefined);
  const [statusCode, setStatusCode] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
    setStatusCode(error && error.response ? error.response.status : null);

  }, [error]);

  const reloadSession = function() {
    window.location.reload();
  };

  const clearError = () => {
    removeBanner(id);
  };

  const getCustomMessage = () => {
    if (statusCode === 401 || (messageBody && messageBody.includes("401"))) {
      return (
        <span className="ml-1">
          <a style={{textDecoration: "underline"}} href="#" onClick={() => { reloadSession(); }}>Click here to renew session.</a>
        </span>
      );
    }
  };

  const getCloseButton = () => {
    if (removeBanner) {
      return (
        <div className="float-right mr-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearError();}}/>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-100 error-block top-dialog-block">
      {getCloseButton()}
      {prependMessage} {messageBody} {getCustomMessage()}
    </div>
  );
}

ErrorBanner.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  id: PropTypes.string,
  removeBanner: PropTypes.func,
  prependMessage: PropTypes.string,
};

export default ErrorBanner;
