import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {parseError} from "components/common/helpers/error-helpers";
import BannerBase from "components/common/status_notifications/banners/BannerBase";

function InlineErrorBanner(
  {
    error,
    prependMessage,
    removeInlineMessage,
  }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
  }, [error]);

  return (
    <BannerBase
      bannerClassName={"error-block py-2"}
      bannerMessage={`${prependMessage} ${messageBody}`}
      removeBannerFunction={removeInlineMessage}
    />
  );
}

InlineErrorBanner.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  prependMessage: PropTypes.string,
  removeInlineMessage: PropTypes.func
};

export default InlineErrorBanner;
