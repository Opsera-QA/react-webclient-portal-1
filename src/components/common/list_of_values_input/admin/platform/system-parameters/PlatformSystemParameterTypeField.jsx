import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import platformSystemParameterConstants
  from "@opsera/definitions/constants/platform/system_parameters/platformSystemParameter.constants";

export default function PlatformSystemParameterTypeField(
  {
    fieldName,
    model,
    className,
    showLabel,
  }) {
  return (
    <ConstantFieldBase
      getLabelFunction={platformSystemParameterConstants.getLabelForSystemParameterType}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

PlatformSystemParameterTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};