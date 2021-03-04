import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const jenkinsResults = [
  {value: "SUCCESS", text: "Success"},
  {value: "FAILURE", text: "Failure"},
  {value: "UNSTABLE", text: "Unstable"},
];

function JenkinsResultFilterInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={jenkinsResults}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

JenkinsResultFilterInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

JenkinsResultFilterInput.defaultProps = {
  fieldName: "value",
};

export default JenkinsResultFilterInput;