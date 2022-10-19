import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const REGISTRY_LIST = [
  {
    name: "Nexus",
    value: "nexus",
  },
  {
    name: "ECR",
    value: "ecr",
  },
  {
    name: "ACR",
    value: "acr",
  },
  {
    name: "JFrog",
    value: "jfrog",
  },
];

function DockerCliRegistryTypeSelectInput({model, setModel, isLoading, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("registryType", selectedOption?.value);
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("nexusToolConfigId");
    newModel.setDefaultValue("dockerPort");
    newModel.setDefaultValue("jfrogToolConfigId");
    newModel.setDefaultValue("awsToolConfigId");    
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"registryType"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={REGISTRY_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Registry Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

DockerCliRegistryTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default DockerCliRegistryTypeSelectInput;
