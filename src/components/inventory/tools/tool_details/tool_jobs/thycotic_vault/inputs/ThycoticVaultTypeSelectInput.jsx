import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ThycoticVaultTypeSelectInput({ model, setModel, isLoading, disabled }) {

  const VAULT_TYPE_LIST = [
    {
      name: "Managed Vault",
      value: "managed_vault",
    },
    {
      name: "Secrets Provider",
      value: "secrets_provider",
    },
  ];

  return (
    <SelectInputBase
      fieldName={"vaultType"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={VAULT_TYPE_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Vault Type"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

ThycoticVaultTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ThycoticVaultTypeSelectInput;
