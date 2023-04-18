import React from "react";
import PropTypes from "prop-types";
import JenkinsDependencyMultiSelectInput
  from "components/common/list_of_values_input/tools/jenkins/dependencies/JenkinsDependencyMultiSelectInput";
import {getJenkinsDependencies}
  from "components/common/list_of_values_input/tools/jenkins/dependencies/jenkinsDependencyConstants";

const excludeArr = ["SFDC DATA TRANSFORM"];

function JenkinsStepDependencyTypeInput({model, setModel, disabled, buildType}) {

  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = { ...model };
    newDataObject.setData("dependencyType", selectedOption.dependencyType);
    newDataObject.setData("dependencies", selectedOption.dependencies);
    setModel({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject?.setDefaultValue("dependencyType");
    newDataObject?.setDefaultValue("dependencies");
    setModel({ ...newDataObject });
  };

  if (excludeArr.includes(model?.getData("jobType"))) {
    return null;
  }

  return (
    <JenkinsDependencyMultiSelectInput
      model={model}
      setDataFunction={setDependencyTypes}
      clearDataFunction={clearDataFunction}
      fieldName={"dependencyType"}
      setModel={setModel}
      disabled={disabled}
      dependencies={getJenkinsDependencies(buildType)}
    />
  );
}

JenkinsStepDependencyTypeInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  buildType: PropTypes.string,
};

export default JenkinsStepDependencyTypeInput;