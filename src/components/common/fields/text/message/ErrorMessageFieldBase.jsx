import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {faCircleExclamation} from "@fortawesome/pro-light-svg-icons";

export default function ErrorMessageFieldBase(
  {
    label,
    message,
    className,
    showErrorLabel,
  }) {
  const parsedMessage = DataParsingHelper.parseString(message);

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
      icon={faCircleExclamation}
      messageFieldClassName={"error-message-field"}
    />
  );
}

ErrorMessageFieldBase.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
  showErrorLabel: PropTypes.bool,
};