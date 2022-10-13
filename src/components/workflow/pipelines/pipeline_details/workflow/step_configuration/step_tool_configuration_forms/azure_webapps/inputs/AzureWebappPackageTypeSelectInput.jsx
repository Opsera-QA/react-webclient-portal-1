import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";

function AzureWebappPackageTypeSelectInput({ model, setModel, disabled, fieldName }) {

  const PACKAGE_TYPES = [
    {
      name: "ear",
      value: "ear",
    },
    {
      name: "jar",
      value: "jar",
    },
    {
      name: "lib",
      value: "lib",
    },
    {
      name: "startup",
      value: "startup",
    },
    {
      name: "static",
      value: "static",
    },
    {
      name: "war",
      value: "war",
    },
    {
      name: "zip",
      value: "zip",
    },
  ];

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={PACKAGE_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a Package Type"}
      disabled={disabled}
    />
  );
}


AzureWebappPackageTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureWebappPackageTypeSelectInput.defaultProps = {
  fieldName: "webappPackageType",
  disabled: false
};

export default AzureWebappPackageTypeSelectInput;
