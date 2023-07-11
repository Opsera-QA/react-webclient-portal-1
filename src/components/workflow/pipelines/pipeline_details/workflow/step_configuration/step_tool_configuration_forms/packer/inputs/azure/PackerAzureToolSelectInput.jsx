import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function PackerAzureToolSelectInput({ fieldName, model, setModel, disabled, textField, valueField}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("azureCredentialId", "");
    newModel.setData(fieldName, selectedOption?._id);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("azureCredentialId", "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedAzureToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

PackerAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

PackerAzureToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolConfigId",
  
};

export default PackerAzureToolSelectInput;
