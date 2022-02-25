import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedSlackToolSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    fieldName,
    disabled,
    placeholderText,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"slack"}
      toolFriendlyName={"Slack"}
      fieldName={fieldName}
      configurationRequired={false}
      placeholderText={placeholderText}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

RoleRestrictedSlackToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
};

export default RoleRestrictedSlackToolSelectInput;