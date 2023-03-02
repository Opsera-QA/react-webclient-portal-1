import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {faCircleCheck} from "@fortawesome/pro-light-svg-icons";

export default function SuccessMessageFieldBase(
  {
    label,
    message,
    className,
    showSuccessLabel,
  }) {
  const parsedMessage = DataParsingHelper.parseString(message);

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
      icon={faCircleCheck}
      messageFieldClassName={"success-message-field"}
    />
  );
}

SuccessMessageFieldBase.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
  showSuccessLabel: PropTypes.bool,
};