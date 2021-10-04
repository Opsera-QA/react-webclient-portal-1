import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const CLOUD_PROVIDER_OPTIONS = [
  {
    name: "AWS",
    value: "aws"
  }
];

function TerraformCloudProviderSelectInput({dataObject, setDataObject, disabled, fieldName}) {  
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={CLOUD_PROVIDER_OPTIONS}
      valueField="value"
      textField="name"
      disabled={disabled}
  />
  );
}

TerraformCloudProviderSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default TerraformCloudProviderSelectInput;
