import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";

function InlineWarning({warningMessage, className}) {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    setMessageBody(warningMessage);
  }, [warningMessage]);

  if (hasStringValue(messageBody) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <div className={"warning-text"}>
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

InlineWarning.defaultPros = {
  className: "p-2",
};

export default InlineWarning;