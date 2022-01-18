import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedRegistryToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/applications/RoleRestrictedRegistryToolApplicationSelectInput";

function ArgoAzureApplicationSelectInput({fieldName, model, setModel}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setData("clientId", "");
    newModel.setData("clientSecret", "");
    newModel.setData("clusterName", "");
    newModel.setData("resourceGroup", "");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setData("clientId", "");
    newModel.setData("clientSecret", "");
    newModel.setData("clusterName", "");
    newModel.setData("resourceGroup", "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedRegistryToolApplicationSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      toolId={model?.getData("platformToolId")}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"_id"}
      textField={'name'}
      placeholder={'Select Azure Application Credential'}
    />
  );
}

ArgoAzureApplicationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func
};

ArgoAzureApplicationSelectInput.defaultProps = {
  fieldName: "azureApplicationId",
};

export default ArgoAzureApplicationSelectInput;
