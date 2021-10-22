import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedMicrosoftTeamsToolSelectInput(
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
      toolIdentifier={"teams"}
      toolFriendlyName={"Microsoft Teams"}
      fieldName={fieldName}
      configurationRequired={true}
      placeholderText={placeholderText}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

RoleRestrictedMicrosoftTeamsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
};

export default RoleRestrictedMicrosoftTeamsToolSelectInput;