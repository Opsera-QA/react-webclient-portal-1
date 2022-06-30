import React from "react";
import PropTypes from "prop-types";
import {
  getEndpointTypeLabel,
} from "components/common/list_of_values_input/inventory/endpoints/type/endpointType.constants";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";

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
      getLabelFunction={getEndpointTypeLabel}
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