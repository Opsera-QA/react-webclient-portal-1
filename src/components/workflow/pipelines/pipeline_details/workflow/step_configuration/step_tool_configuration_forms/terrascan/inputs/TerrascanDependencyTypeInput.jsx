import React from "react";
import PropTypes from "prop-types";
import DependencyMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/DependencyMultiSelectInput";

function TerrascanDependencyTypeInput({dataObject, setDataObject, disabled}) {


  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("dependencyType", selectedOption.dependencyType);
    newDataObject.setData("dependencies", selectedOption.dependencies);
    setDataObject({...newDataObject});
  };

  return (
    <DependencyMultiSelectInput
      dataObject={dataObject}
      setDataFunction={setDependencyTypes}
      fieldName={"dependencyType"}
      setDataObject={setDataObject}
    />
  );
}

TerrascanDependencyTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerrascanDependencyTypeInput;