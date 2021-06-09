import React from "react";
import PropTypes from "prop-types";
import DependencyMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/DependencyMultiSelectInput";

function SfdcDependencyTypeInput({dataObject, setDataObject, disabled}) {
  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};

    // Faseeh, this should be dealt with before sending it here. If this isn't good, change the way you store the item inside the base component
    let dependenciesObj = {};
    selectedOption.map((item) => {
      dependenciesObj[item.dependencyType] = item.version;
    });
    // console.log(dependenciesObj);
    newDataObject.setData("dependencyType", selectedOption);
    newDataObject.setData("dependencies", dependenciesObj);
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

SfdcDependencyTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SfdcDependencyTypeInput;
