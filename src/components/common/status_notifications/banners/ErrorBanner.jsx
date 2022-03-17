import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {parseError} from "../../helpers/error-helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import BannerBase from "components/common/status_notifications/banners/BannerBase";

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
        <span className={"ml-1"}>
          <a style={{textDecoration: "underline"}} href="#" onClick={() => { reloadSession(); }}>Click here to renew session.</a>
        </span>
      );
    }
  };

  const getPrependMessage = () => {
    if (hasStringValue(prependMessage) === true) {
      return (
        <span>{`${prependMessage} `}</span>
      );
    }
  };

  const getBannerMessage = () => {
    return (
      <div>
        {getPrependMessage()}
        {messageBody}
        {getCustomMessage()}
      </div>
    );
  };

  return (
    <BannerBase
      removeBannerFunction={clearError}
      bannerMessage={getBannerMessage()}
      bannerClassName={"w-100 py-3 error-block top-dialog-block"}
    />
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
