import React from 'react';
import PropTypes from 'prop-types';
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import endpointResponseEvaluationOptionConstants
  from "@opsera/definitions/constants/api/request/endpoint/endpointResponseEvaluationOption.constants";

function EndpointResponseEvaluationOptionField(
  {
    model,
    fieldName,
    className,
  }) {
  return (
    <ConstantFieldBase
      model={model}
      fieldName={fieldName}
      getLabelFunction={endpointResponseEvaluationOptionConstants.getEndpointResponseEvaluationOptionLabel}
      className={className}
    />
  );
}

EndpointResponseEvaluationOptionField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};

export default EndpointResponseEvaluationOptionField;