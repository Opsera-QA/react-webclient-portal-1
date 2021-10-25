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
      name: ".NET",
      value: "dotnet",
    },
    {
      name: "Python",
      value: "python",
    },
  ];

function JenkinsJobsBuildTypeSelectInput({ fieldName, model, setModel }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const value = selectedOption?.value;
    let newModel = model;
    newModel.setData("buildTool", value);
    newModel.setData("buildType", value);
    setModel({...newModel});
  };

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