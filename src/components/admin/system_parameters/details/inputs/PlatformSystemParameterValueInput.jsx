import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { platformSystemParameterConstants } from "components/admin/system_parameters/platformSystemParameter.constants";
import PlatformSystemParameterTypeSelectInputBase
  from "components/common/list_of_values_input/admin/platform/system-parameters/PlatformSystemParameterTypeSelectInputBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import NumberPickerInputBase from "components/common/inputs/number/picker/base/NumberPickerInputBase";
import JsonInput from "components/common/inputs/object/JsonInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import { validateEmail } from "utils/helpers";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";

export default function PlatformSystemParameterValueInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const type = model?.getData("type");

  if (hasStringValue(type) !== true) {
    return null;
  }

  // TODO: Should email addresses be an option?
  switch (type) {
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.ARRAY:
      return (
        <MultiTextListInputBase
          model={model}
          setModel={setModel}
          fieldName={fieldName}
          // customTitle={}
          // isPotentialValueValidFunction={validateEmail}
          // error={error}
          // singularTopic={singularTopic}
          // pluralTopic={pluralTopic}
          // className={className}
          disabled={disabled}
        />
      );
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.BOOLEAN:
      return (
        <BooleanToggleInput
          disabled={disabled}
          dataObject={model}
          setDataObject={setModel}
          fieldName={fieldName}
        />
      );
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.NUMBER:
      return (
        <NumberPickerInputBase
          fieldName={fieldName}
          dataObject={model}
          setDataObject={setModel}
        />
      );
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.OBJECT:
      return (
        <JsonInput
          fieldName={fieldName}
          model={model}
          setModel={setModel}
        />
      );
    case platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPES.STRING:
      return (
        <TextInputBase
          fieldName={fieldName}
          dataObject={model}
          setDataObject={setModel}
        />
      );
    default:
      return null;
  }
}

PlatformSystemParameterValueInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

PlatformSystemParameterValueInput.defaultProps = {
  fieldName: "value",
};