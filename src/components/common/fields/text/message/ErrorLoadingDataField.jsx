import React from "react";
import PropTypes from "prop-types";
import {errorHelpers} from "components/common/helpers/error-helpers";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";

export default function ErrorLoadingDataField(
  {
    error,
    pluralTopic,
    className,
  }) {
  if (error == null) {
    return null;
  }

  return (
    <ErrorMessageFieldBase
      className={className}
      showErrorLabel={false}
      message={errorHelpers.parseApiErrorForInfoText(pluralTopic, error)}
    />
  );
}

ErrorLoadingDataField.propTypes = {
  error: PropTypes.any,
  pluralTopic: PropTypes.string,
  className: PropTypes.string,
};