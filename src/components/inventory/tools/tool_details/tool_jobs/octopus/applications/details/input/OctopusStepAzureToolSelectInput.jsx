import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureAccountToolSelectInput
  from "components/common/list_of_values_input/tools/azure_account/RoleRestrictedAzureAccountToolSelectInput";

function OctopusStepAzureToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField ,
    setAzureConfig
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    setAzureConfig(selectedOption);

    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setData("clusterName", "");
    newDataObject.setData("resourceGroupName", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("clusterName", "");
    newDataObject.setData("resourceGroupName", "");
    setAzureConfig(null);
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedAzureAccountToolSelectInput
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

OctopusStepAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  setAzureConfig:PropTypes.func,
};

OctopusStepAzureToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolId",
};

export default OctopusStepAzureToolSelectInput;
