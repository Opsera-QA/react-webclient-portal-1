import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import {faCircleInfo} from "@fortawesome/pro-light-svg-icons";

export default function InfoMessageFieldBase(
  {
    label,
    message,
    className,
    showInformationLabel,
  }) {
  const getLabel = () => {
    if (showInformationLabel !== false) {
      return (
        <strong className={"mr-2"}>Info:</strong>
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
      icon={faCircleInfo}
      messageFieldClassName={"info-message-field"}
    />
  );
}

InfoMessageFieldBase.propTypes = {
  label: PropTypes.string,
  message: PropTypes.any,
  className: PropTypes.string,
  showInformationLabel: PropTypes.bool,
};