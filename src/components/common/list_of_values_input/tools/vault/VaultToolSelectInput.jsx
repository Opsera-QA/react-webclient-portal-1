import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function VaultToolSelectInput({ fieldName, model, setModel, setDataFunction, disabled, className, toolIdentifier }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={toolIdentifier}
      toolFriendlyName={"Vault"}
      fieldName={fieldName}
      placeholderText={"Opsera Default Hashicorp Vault"}
      setDataFunction={setDataFunction}
      model={model}
      setModel={setModel}
      disabled={disabled}
      className={className}
    />
  );
}

VaultToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  toolIdentifier: PropTypes.string,
};

VaultToolSelectInput.defaultProps = {
  fieldName: "vault",
};

export default VaultToolSelectInput;
