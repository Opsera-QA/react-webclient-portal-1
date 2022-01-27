import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import terraformStepFormMetadata from "../../terraform-stepForm-metadata";

function TerraformIAmRoleFlagToggleInput({model, setModel, disabled}) {
  
  const setRoleFlag = (fieldName, selectedValue) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedValue);
    newModel.setData("accessKeyParamName", "");
    newModel.setData("secretKeyParamName", "");
    newModel.setData("regionParamName", "");
    newModel.setData("roleArn", "");
    newModel.setData("roleName", "");
    newModel.setMetaDataFields(selectedValue === true ? terraformStepFormMetadata.fieldsAlt : terraformStepFormMetadata.fields);
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

TerraformIAmRoleFlagToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformIAmRoleFlagToggleInput;