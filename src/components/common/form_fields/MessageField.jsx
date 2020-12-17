import React from "react";
import PropTypes from "prop-types";

function MessageField({ message }) {
  return (
    <div className="m-3 p-3 text-muted italic message-field">
      <span>{message}</span>
    </div>
  );
}

MessageField.propTypes = {
  message: PropTypes.string,
};

export default MessageField;