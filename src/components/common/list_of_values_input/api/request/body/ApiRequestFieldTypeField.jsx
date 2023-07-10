import React from "react";
import PropTypes from "prop-types";
import apiFieldTypeConstants from "@opsera/definitions/constants/api/request/apiFieldType.constants";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";

export default function ApiRequestFieldTypeField(
  {
    model,
    className,
    fieldName,
  }) {
  return (
    <ConstantFieldBase
      model={model}
      fieldName={fieldName}
      getLabelFunction={apiFieldTypeConstants.getApiFieldTypeLabel}
      className={className}
    />
  );
}

ApiRequestFieldTypeField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};
