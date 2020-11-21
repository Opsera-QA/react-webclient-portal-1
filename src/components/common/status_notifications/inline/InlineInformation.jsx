import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function InlineInformation ({ message }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    setMessageBody(message);
  }, [message]);

  return (
    <div className="mt-1 mb-3">
      <div className="info-text p-1">
        {messageBody}
      </div>
    </div>
  );
}

InlineInformation.propTypes = {
  message: PropTypes.string,
  setInformationMessage: PropTypes.func,
  alignment: PropTypes.string,
};

export default InlineInformation;