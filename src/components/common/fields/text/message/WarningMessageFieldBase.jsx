import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";

export default function WarningMessageFieldBase(
  {
    label,
    message,
    className,
    showWarningLabel,
  }) {
  const getLabel = () => {
    if (showWarningLabel !== false) {
      return (
        <strong className={"mr-2"}>Warning:</strong>
      );
    }
  };

  const getMessage = () => {
    return (
      <div>
        {getLabel()}{message}
      </div>
    );
  };

  if (message == null) {
    return null;
  }

  return (
    <MessageFieldBase
      className={className}
      label={label}
      message={getMessage()}
      icon={faTriangleExclamation}
      messageFieldClassName={"warning-message-field"}
    />
  );
}

WarningMessageFieldBase.propTypes = {
  label: PropTypes.string,
  message: PropTypes.any,
  className: PropTypes.string,
  showWarningLabel: PropTypes.bool,
};