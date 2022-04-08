import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const CLUSTER_TYPES = [
    {name : "Private", value: "PRIVATE"},
    {name : "Public", value: "PUBLIC"},
];

function ArgoAzureClusterTypeSelectInput({ fieldName, model, setModel, disabled, textField, valueField}) {
  
  console.log("ArgoAzureClusterTypeSelectInput");

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={CLUSTER_TYPES}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

ArgoAzureClusterTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ArgoAzureClusterTypeSelectInput.defaultProps = {
  fieldName: "clusterType",
  valueField: "value",
  textField: "name"
};

export default ArgoAzureClusterTypeSelectInput;
