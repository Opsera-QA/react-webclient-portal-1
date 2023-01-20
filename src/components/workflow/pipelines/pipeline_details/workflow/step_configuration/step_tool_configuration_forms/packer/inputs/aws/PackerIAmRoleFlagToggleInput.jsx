import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function PackerIAmRoleFlagToggleInput({model, setModel, disabled}) {
  
  const setRoleFlag = (fieldName, selectedValue) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedValue);
    newModel.setData("roleArn", "");
    newModel.setData("roleName", "");
    setModel({...newModel});
  };
  
  return (
    <BooleanToggleInput
      setDataFunction={setRoleFlag}
      dataObject={model}
      setDataObject={setModel}
      fieldName={"iamRoleFlag"}
      disabled={disabled}
    />
  );
}

PackerIAmRoleFlagToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PackerIAmRoleFlagToggleInput;