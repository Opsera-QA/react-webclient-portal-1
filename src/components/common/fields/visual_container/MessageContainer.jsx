import React from "react";
import PropTypes from "prop-types";

function MessageContainer({ message }) {
  return (
    <div className="m-3 p-3 text-muted italic message-field">
      <span>{message}</span>
    </div>
  );
}

MessageContainer.propTypes = {
  message: PropTypes.string,
};

export default MessageContainer;