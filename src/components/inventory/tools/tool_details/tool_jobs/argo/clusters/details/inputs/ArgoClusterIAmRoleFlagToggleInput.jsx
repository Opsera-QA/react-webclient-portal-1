import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoClusterIAmRoleFlagToggleInput({model, setModel, disabled}) {
  
  const setRoleFlag = (fieldName, selectedValue) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedValue);
    newModel.setData("roleArn", "");
    newModel.setData("roleSessionName", "");
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

ArgoClusterIAmRoleFlagToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoClusterIAmRoleFlagToggleInput;