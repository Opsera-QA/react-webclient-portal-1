import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function InlineInformation ({ message, className }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    setMessageBody(message);
  }, [message]);

  return (
    <div className={className}>
      <div className="info-text p-1">
        {messageBody}
      </div>
    </div>
  );
}

InlineInformation.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default InlineInformation;