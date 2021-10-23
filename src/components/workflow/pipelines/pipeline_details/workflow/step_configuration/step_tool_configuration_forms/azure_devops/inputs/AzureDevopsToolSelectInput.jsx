import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureDevopsToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureDevopsToolSelectInput";

function AzureDevopsToolSelectInput({ fieldName, model, setModel, disabled, textField, valueField}) {
  const setDataFunction = async (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("organizationName", selectedOption?.configuration?.organization);
    newModel.setData("accessToken", selectedOption?.configuration?.accessToken);
    setModel({...newModel});
  };

  const clearDataFunction = async () => {
    let newModel = model;
    newModel.setData("toolConfigId", "");
    newModel.setData("organizationName", "");
    newModel.setData("azurePipelineId", "");
    newModel.setData("accessToken", "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedAzureDevopsToolSelectInput
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

AzureDevopsToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

export default AzureDevopsToolSelectInput;