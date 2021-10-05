import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedOctopusToolSelectInput({model, setModel, textField, setDataFunction, clearDataFunction, className, fieldName, disabled}) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"octopus"}
      toolFriendlyName={"Octopus"}
      fieldName={fieldName}
      placeholderText={"Select Octopus Tool"}
      configurationRequired={true}
      textField={textField}
      clearDataFunction={clearDataFunction}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

RoleRestrictedOctopusToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
};

export default RoleRestrictedOctopusToolSelectInput;