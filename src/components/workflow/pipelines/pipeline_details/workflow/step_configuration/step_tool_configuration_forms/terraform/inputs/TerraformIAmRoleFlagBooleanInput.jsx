import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function TerraformIAmRoleFlagBooleanInput({dataObject, setDataObject, disabled}) {
  
  const setRoleFlag = (fieldName, selectedValue) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedValue);
    newDataObject.setData("accessKeyParamName", selectedValue);
    newDataObject.setData("secretKeyParamName", selectedValue);
    newDataObject.setData("regionParamName", selectedValue);
    newDataObject.setData(fieldName, selectedValue);
    setDataObject({...newDataObject});

  };
  
  return (
    <BooleanToggleInput setDataFunction={setRoleFlag} dataObject={dataObject} setDataObject={setDataObject} fieldName={"iamRoleFlag"} />
  );
}

TerraformIAmRoleFlagBooleanInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformIAmRoleFlagBooleanInput;