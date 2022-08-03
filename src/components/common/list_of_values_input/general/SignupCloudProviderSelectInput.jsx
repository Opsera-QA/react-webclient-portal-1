import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const cloudProviders = [
  { value: "EKS", text: "AWS" },
  { value: "AKS", text: "Azure" },
  // { value: "GKE", text: "GCP" }
];

function SignupCloudProviderSelectInput({ fieldName, model, setModel, setDataFunction, disabled, textField, valueField}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={cloudProviders}
        setDataFunction={setDataFunction}
        valueField={valueField}
        textField={textField}
        // placeholderText={placeholderText}
        disabled={disabled}
      />
    </div>
  );
}

SignupCloudProviderSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

SignupCloudProviderSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default SignupCloudProviderSelectInput;