import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {faCircleInfo} from "@fortawesome/pro-light-svg-icons";

export default function InfoMessageFieldBase(
  {
    label,
    message,
    className,
    showInformationLabel,
  }) {
  const parsedMessage = DataParsingHelper.parseString(message);

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