import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {parseError} from "components/common/helpers/error-helpers";

function InlineErrorText({ error, prependMessage, className }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
  }, [error]);

  return (
    <div className={`error-text ${className}`}>      
        {prependMessage} {messageBody}      
    </div>
  );
}

InlineErrorText.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  prependMessage: PropTypes.string,
  className: PropTypes.string,
};

export default InlineErrorText;
