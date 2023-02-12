import React from "react";
import PropTypes from "prop-types";
import BooleanFieldBase from "components/common/fields/boolean/BooleanFieldBase";

function BooleanField({dataObject, fieldName, className}) {
  const field = dataObject.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <BooleanFieldBase
      label={field?.label}
      value={dataObject?.getData(fieldName)}
      className={className}
    />
  );
}

BooleanField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default BooleanField;