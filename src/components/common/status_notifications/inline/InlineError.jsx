import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {parseError} from "../../helpers/error-helpers";

function InlineError({ error, prependMessage }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
  }, [error]);

  return (
    <div className="mx-3 my-3 max-content-module-width-50">
      <div className="error-text">
        {prependMessage} {messageBody}
      </div>
    </div>
  );
}

InlineError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  prependMessage: PropTypes.string,
};

export default InlineError;
