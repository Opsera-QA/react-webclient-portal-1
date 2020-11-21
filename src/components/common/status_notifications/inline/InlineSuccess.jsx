import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function InlineSuccess({ successMessage }) {
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    setMessageBody(successMessage);
  }, [successMessage]);

  return (
    <div className="row">
      <div className="col-sm-12 my-auto text-center">
        <div className="success-text">
          <span>{messageBody}</span>
        </div>
      </div>
    </div>
  );

}

InlineSuccess.propTypes = {
  successMessage: PropTypes.string,
};

export default InlineSuccess;