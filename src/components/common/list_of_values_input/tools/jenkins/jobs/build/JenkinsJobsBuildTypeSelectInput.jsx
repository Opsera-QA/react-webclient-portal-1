import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JENKINS_BUILD_OPTIONS = [
    {
      name: "Gradle",
      value: "gradle",
    },
    {
      name: "Maven",
      value: "maven",
    },
    {
      name: "Docker",
      value: "docker",
    },
    {
      name: "MS Build",
      value: "msbuild",
    },
    {
      name: "Python",
      value: "python",
    },
  ];

function JenkinsJobsBuildTypeSelectInput({ fieldName, model, setModel, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JENKINS_BUILD_OPTIONS}
      valueField="value"
      textField="name"
    />
  );
}

JenkinsJobsBuildTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default JenkinsJobsBuildTypeSelectInput;