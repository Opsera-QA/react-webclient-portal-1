import React from "react";
import PropTypes from "prop-types";
import DependencyMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/DependencyMultiSelectInput";

function BlackDuckDependencyMultiSelectInput({ model, setModel, disabled }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("dependencyType", selectedOption.dependencyType);
    newModel.setData("dependencies", selectedOption.dependencies);
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel?.setDefaultValue("dependencyType");
    newModel?.setDefaultValue("dependencies");
    setModel({ ...newModel });
  };

  return (
    <DependencyMultiSelectInput
      dataObject={model}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={"dependencyType"}
      setDataObject={setModel}
    />
  );
}

BlackDuckDependencyMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BlackDuckDependencyMultiSelectInput;
