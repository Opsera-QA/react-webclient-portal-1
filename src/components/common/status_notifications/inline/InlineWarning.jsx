import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// TODO: Clean up code once dialogs are completed
function InlineWarning({warningMessage}) {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    setMessageBody(warningMessage);
  }, [warningMessage]);

  return (
    <div className="row">
      <div className="col-sm-12 my-auto warning-block text-center p-2">
        <span>{messageBody}</span>
      </div>
    </div>
  );

}

InlineWarning.propTypes = {
  warningMessage: PropTypes.string,
  setWarningMessage: PropTypes.string,
  alignment: PropTypes.string,
  autoCloseDialog: PropTypes.bool
};

export default InlineWarning;