import React from "react";
import PropTypes from "prop-types";
import JenkinsDependencyMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/JenkinsDependencyMultiSelectInput";

function JenkinsDependencyTypeInput({dataObject, setDataObject, disabled}) {
  const setDependencyTypes = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    let dependenciesObj = {};
    selectedOption.map((item) => {
      dependenciesObj[item.dependencyType] = item.dependencyType+"-"+item.version;
    });
    // console.log(dependenciesObj);
    newDataObject.setData("dependencyType", selectedOption);
    newDataObject.setData("dependencies", dependenciesObj);
    setDataObject({...newDataObject});
  };

  return (
    <JenkinsDependencyMultiSelectInput
      dataObject={dataObject}
      setDataFunction={setDependencyTypes}
      fieldName={"dependencyType"}
      setDataObject={setDataObject}
    />
  );
}

JenkinsDependencyTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default JenkinsDependencyTypeInput;