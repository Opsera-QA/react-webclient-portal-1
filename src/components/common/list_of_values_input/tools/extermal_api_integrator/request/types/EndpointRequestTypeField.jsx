import React from 'react';
import PropTypes from 'prop-types';
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import endpointRequestType from "@opsera/definitions/constants/api/request/endpoint/endpointRequestType.constants";

function EndpointRequestTypeField(
  {
    model,
    fieldName,
    className,
  }) {
  return (
    <ConstantFieldBase
      model={model}
      fieldName={fieldName}
      getLabelFunction={endpointRequestType.getEndpointRequestTypeLabel}
      className={className}
    />
  );
}

EndpointRequestTypeField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

export default EndpointRequestTypeField;