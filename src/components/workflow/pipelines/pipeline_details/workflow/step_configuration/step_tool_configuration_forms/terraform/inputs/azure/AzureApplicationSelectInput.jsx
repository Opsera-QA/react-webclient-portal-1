import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedRegistryToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/applications/RoleRestrictedRegistryToolApplicationSelectInput";

function AksServiceDeployStepApplicationSelectInput({fieldName, model, setModel}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData(fieldName, selectedOption._id);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedRegistryToolApplicationSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      toolId={model?.getData("azureCPToolConfigId")}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"_id"}
      textField={'name'}
      placeholder={'Select Azure Application Credential'}
    />
  );
}

AksServiceDeployStepApplicationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func
};

AksServiceDeployStepApplicationSelectInput.defaultProps = {
  fieldName: "azureCPCredentialId",
};

export default AksServiceDeployStepApplicationSelectInput;
