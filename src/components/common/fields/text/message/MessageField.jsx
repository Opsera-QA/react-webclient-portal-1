import React from "react";
import PropTypes from "prop-types";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";

export default function MessageField(
  {
    model,
    fieldName,
    className,
  }) {
  const field = model?.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <MessageFieldBase
      className={className}
      label={field?.label}
      message={model?.getData(fieldName)}
    />
  );
}

MessageField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};