import React from 'react';
import PropTypes from 'prop-types';
import {
  getEndpointRequestTypeLabel
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request_types/endpointRequestType.constants";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";

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
      getLabelFunction={getEndpointRequestTypeLabel}
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