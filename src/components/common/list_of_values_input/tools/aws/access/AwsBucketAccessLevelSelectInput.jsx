import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const BUCKET_ACCESS_OPTIONS = [
  {text: "Public", value: "public"},
  {text: "Private", value: "private"}
];

function AwsBucketAccessLevelSelectInput({ fieldName, model, setModel, isLoading, setDataFunction, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={BUCKET_ACCESS_OPTIONS}
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={"Select Bucket Access Level"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

AwsBucketAccessLevelSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  isLoading: PropTypes.bool,
};

export default AwsBucketAccessLevelSelectInput;