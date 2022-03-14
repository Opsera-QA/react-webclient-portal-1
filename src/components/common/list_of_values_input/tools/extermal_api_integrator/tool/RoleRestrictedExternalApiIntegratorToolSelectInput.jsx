import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function RoleRestrictedExternalApiIntegratorToolSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    fieldName,
    disabled,
    visible,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR}
      toolFriendlyName={"External API Integrator"}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      visible={visible}
    />
  );
}

RoleRestrictedExternalApiIntegratorToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
};

export default RoleRestrictedExternalApiIntegratorToolSelectInput;