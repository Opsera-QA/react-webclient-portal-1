import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";

export default function WarningMessageFieldBase(
  {
    label,
    message,
    className,
    showWarningLabel,
  }) {
  const parsedMessage = DataParsingHelper.parseString(message);

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
        {getLabel()}{parsedMessage}
      </div>
    );
  };

  if (!parsedMessage) {
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
  message: PropTypes.string,
  className: PropTypes.string,
  showWarningLabel: PropTypes.bool,
};