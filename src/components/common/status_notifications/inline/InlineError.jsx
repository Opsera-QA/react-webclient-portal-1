import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {parseError} from "components/common/helpers/error-helpers";

function InlineError({ error, prependMessage }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
  }, [error]);

  return (
    <div className="error-block">
      <div className="p-2">
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
