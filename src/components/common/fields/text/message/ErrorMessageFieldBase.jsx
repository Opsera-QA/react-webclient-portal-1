import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import {faCircleExclamation} from "@fortawesome/pro-light-svg-icons";

export default function ErrorMessageFieldBase(
  {
    label,
    message,
    className,
    showErrorLabel,
  }) {
  const getLabel = () => {
    if (showErrorLabel !== false) {
      return (
        <strong className={"mr-2"}>Error:</strong>
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
      icon={faCircleExclamation}
      messageFieldClassName={"error-message-field"}
    />
  );
}

ErrorMessageFieldBase.propTypes = {
  label: PropTypes.string,
  message: PropTypes.any,
  className: PropTypes.string,
  showErrorLabel: PropTypes.bool,
};