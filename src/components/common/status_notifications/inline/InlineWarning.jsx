import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function InlineWarning({warningMessage, className}) {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    setMessageBody(warningMessage);
  }, [warningMessage]);

  if (messageBody == null || messageBody === "") {
    return null;
  }

  return (
    <div className={className}>
      <div className="row">
        <div className="col-sm-12 my-auto warning-text p-2">
          <span>{messageBody}</span>
        </div>
      </div>
    </div>
  );
}

InlineWarning.propTypes = {
  warningMessage: PropTypes.string,
  className: PropTypes.string
};

export default InlineWarning;