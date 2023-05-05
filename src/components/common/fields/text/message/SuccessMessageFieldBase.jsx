import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import {faCircleCheck} from "@fortawesome/pro-light-svg-icons";

export default function SuccessMessageFieldBase(
  {
    label,
    message,
    className,
    showSuccessLabel,
  }) {
  const getLabel = () => {
    if (showSuccessLabel !== false) {
      return (
        <strong className={"mr-2"}>Success:</strong>
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
      icon={faCircleCheck}
      messageFieldClassName={"success-message-field"}
    />
  );
}

SuccessMessageFieldBase.propTypes = {
  label: PropTypes.string,
  message: PropTypes.any,
  className: PropTypes.string,
  showSuccessLabel: PropTypes.bool,
};