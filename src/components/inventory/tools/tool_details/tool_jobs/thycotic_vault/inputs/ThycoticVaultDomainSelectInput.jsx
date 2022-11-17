import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ThycoticVaultDomainSelectInput({ model, setModel, isLoading, disabled }) {

  const DOMAIN_TYPE_LIST = [
    {
      name: "secretsvaultcloud.com (USA)",
      value: "secretsvaultcloud.com",
    },
    {
      name: "secretsvaultcloud.eu (EUROPEAN UNION)",
      value: "secretsvaultcloud.eu",
    },
    {
      name: "secretsvaultcloud.com.au (AUSTRALIA)",
      value: "secretsvaultcloud.com.au",
    },
    {
      name: "secretsvaultcloud.ca (CANADA)",
      value: "secretsvaultcloud.ca",
    },
  ];

  return (
    <SelectInputBase
      fieldName={"domainName"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={DOMAIN_TYPE_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Domain"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

ThycoticVaultDomainSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ThycoticVaultDomainSelectInput;
