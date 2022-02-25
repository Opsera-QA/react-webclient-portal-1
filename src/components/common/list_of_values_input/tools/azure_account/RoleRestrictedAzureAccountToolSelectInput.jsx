import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedAzureAccountToolSelectInput({model, setModel, setDataFunction, clearDataFunction, fieldName, disabled, placeholderText, textField, service}) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={service ? service : "azure_account"}
      toolFriendlyName={"Azure"}
      fieldName={fieldName}
      configurationRequired={true}
      placeholderText={placeholderText}
      model={model}
      textField={textField}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

RoleRestrictedAzureAccountToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  service: PropTypes.string,
};

export default RoleRestrictedAzureAccountToolSelectInput;