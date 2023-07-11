import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedRegistryToolApplicationSelectInput
from "components/common/list_of_values_input/tools/applications/RoleRestrictedRegistryToolApplicationSelectInput";

function CloudProviderAzureApplicationSelect({fieldName, model, setModel}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("clusterName");
    newModel.setDefaultValue("resourceGroup");
    newModel.setDefaultValue("namespace");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setDefaultValue("clusterName");
    newModel.setDefaultValue("resourceGroup");
    newModel.setDefaultValue("namespace");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedRegistryToolApplicationSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      toolId={model?.getData("azureToolConfigId")}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"_id"}
      textField={'name'}
      placeholder={'Select Azure Application Credential'}
    />
  );
}

CloudProviderAzureApplicationSelect.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func
};

CloudProviderAzureApplicationSelect.defaultProps = {
  fieldName: "azureCredentialId",
};

export default CloudProviderAzureApplicationSelect;
