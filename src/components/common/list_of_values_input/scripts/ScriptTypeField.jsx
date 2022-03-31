import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import {getScriptTypeLabel} from "components/common/list_of_values_input/scripts/scriptTypes.constants";

function ScriptTypeField(
  {
    model,
    fieldName,
    className,
    showLabel,
  }) {
  return (
    <ConstantFieldBase
      getLabelFunction={getScriptTypeLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

ScriptTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ScriptTypeField;