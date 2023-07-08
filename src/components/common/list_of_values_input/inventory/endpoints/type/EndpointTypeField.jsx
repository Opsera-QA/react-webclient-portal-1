import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import endpointTypeConstants from "@opsera/definitions/constants/api/request/endpoint/endpointType.constants";

function EndpointTypeField(
  {
    fieldName,
    model,
    className,
  }) {
  return (
    <ConstantFieldBase
      model={model}
      fieldName={fieldName}
      getLabelFunction={endpointTypeConstants.getEndpointTypeLabel}
      className={className}
    />
  );
}

EndpointTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
};

export default EndpointTypeField;