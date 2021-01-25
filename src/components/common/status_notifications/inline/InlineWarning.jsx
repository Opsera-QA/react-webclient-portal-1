import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
};

export default InlineWarning;