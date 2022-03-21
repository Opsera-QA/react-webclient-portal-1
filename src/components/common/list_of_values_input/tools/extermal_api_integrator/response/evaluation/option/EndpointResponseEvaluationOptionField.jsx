import React from 'react';
import PropTypes from 'prop-types';
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import {
  getEndpointResponseEvaluationOptionLabel
} from "components/common/list_of_values_input/tools/extermal_api_integrator/response/evaluation/option/endpointResponseEvaluationOption.constants";

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
      getLabelFunction={getEndpointResponseEvaluationOptionLabel}
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