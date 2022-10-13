import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import AzureToolApplicationSelectInput from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";
import DockerCliAzureRegistryNameSelectInput from "../inputs/DockerCliAzureRegistryNameSelectInput";
import DockerCliAzureRepositoryNameSelectInput from "../inputs/DockerCliAzureRepositoryNameSelectInput";
import RoleRestrictedAzureAccountToolSelectInput from "components/common/list_of_values_input/tools/azure_account/RoleRestrictedAzureAccountToolSelectInput";

function DockerCliAcrDetailsInputForm({ model, setModel }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureCredentialId");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureCredentialId");
    setModel({ ...newModel });
  };

  return (
    <>
      <RoleRestrictedAzureAccountToolSelectInput
        fieldName={"azureToolConfigId"}
        service={"azure"}
        model={model}
        setModel={setModel}        
        clearDataFunction={clearDataFunction}
        setDataFunction={setDataFunction}
      />
      <AzureToolApplicationSelectInput
        model={model}
        setModel={setModel}
        azureToolId={model?.getData("azureToolConfigId")}
        disabled={model?.getData("azureToolConfigId")?.length === 0}
        fieldName={"azureCredentialId"}
      />
      <TextInputBase 
        dataObject={model}
        setDataObject={setModel}
        fieldName={"resource"}
      />
      <DockerCliAzureRegistryNameSelectInput
        model={model}
        setModel={setModel}
        azureToolConfigId={model.getData("azureToolConfigId")}
        resource={model.getData("resource")}
        applicationId={model?.getData("azureCredentialId")}
      />
      <DockerCliAzureRepositoryNameSelectInput
        model={model}
        setModel={setModel}
        acrLoginUrl={model.getData("acrLoginUrl")}
        azureToolId={model.getData("azureToolConfigId")}
        applicationId={model?.getData("azureCredentialId")}
      />
    </>    
  );
}

DockerCliAcrDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DockerCliAcrDetailsInputForm;
