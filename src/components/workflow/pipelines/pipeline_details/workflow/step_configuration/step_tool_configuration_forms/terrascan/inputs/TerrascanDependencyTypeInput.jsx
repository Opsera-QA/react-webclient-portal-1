import React from "react";
import PropTypes from "prop-types";
import DependencyMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/DependencyMultiSelectInput";

function TerrascanDependencyTypeInput({dataObject, setDataObject, disabled}) {


  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};

    let dependenciesObj = {};
    selectedOption.map((item) => {
      dependenciesObj[item.dependencyType] = item.version;
    });
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

TerrascanDependencyTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerrascanDependencyTypeInput;