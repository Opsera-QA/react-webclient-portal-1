import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedServiceNowToolSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    fieldName,
    disabled,
    visible,
    placeholderText,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"servicenow"}
      toolFriendlyName={"Service Now"}
      fieldName={fieldName}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      placeholderText={placeholderText}
      disabled={disabled}
      visible={visible}
    />
  );
}

RoleRestrictedServiceNowToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
  placeholderText: PropTypes.string,
};

export default RoleRestrictedServiceNowToolSelectInput;