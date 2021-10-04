import React from "react";
import PropTypes from "prop-types";
import JenkinsDependencyMultiSelectInput
  from "components/common/list_of_values_input/tools/jenkins/dependencies/JenkinsDependencyMultiSelectInput";

function JenkinsStepDependencyTypeInput({model, setModel, disabled}) {
  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    let dependenciesObj = {};

    selectedOption.map((item) => {
      dependenciesObj[item.dependencyType] = item.dependencyType + "-" + item.version;
    });

    newDataObject.setData("dependencyType", selectedOption);
    newDataObject.setData("dependencies", dependenciesObj);
    setModel({...newDataObject});
  };

  return (
    <JenkinsDependencyMultiSelectInput
      model={model}
      setDataFunction={setDependencyTypes}
      fieldName={"dependencyType"}
      setModel={setModel}
      disabled={disabled}
    />
  );
}

JenkinsStepDependencyTypeInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JenkinsStepDependencyTypeInput;