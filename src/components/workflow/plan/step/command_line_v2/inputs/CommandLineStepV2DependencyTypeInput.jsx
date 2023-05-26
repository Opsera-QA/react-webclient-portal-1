import React from "react";
import PropTypes from "prop-types";
import DependencyMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/DependencyMultiSelectInput";

function CommandLineStepV2DependencyTypeInput({
  dataObject,
  setDataObject,
  disabled,
}) {
  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("dependencyType", selectedOption.dependencyType);
    newDataObject.setData("dependencies", selectedOption.dependencies);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };
    newDataObject?.setDefaultValue("dependencyType");
    newDataObject?.setDefaultValue("dependencies");
    setDataObject({ ...newDataObject });
  };
  
  return (
    <DependencyMultiSelectInput
      dataObject={dataObject}
      setDataFunction={setDependencyTypes}
      clearDataFunction={clearDataFunction}
      fieldName={"dependencyType"}
      setDataObject={setDataObject}
    />
  );
}

CommandLineStepV2DependencyTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommandLineStepV2DependencyTypeInput;
