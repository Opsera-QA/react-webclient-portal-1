import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const REGISTRY_LIST = [
  {
    name: "Nexus",
    value: "nexus",
  },
  {
    name: "Artifactory",
    value: "artifactory",
  },
  {
    name: "DockerHub",
    value: "dockerhub",
  },
  {
    name: "ACR",
    value: "acr",
  },
  {
    name: "ECR",
    value: "ecr",
  },
];

function ContainerCliRegistrySelectInput({model, setModel, isLoading, disabled}) {
  const setDataFunction = async (fieldName, selectedOption) => {
    let newModel = {...model};
    await newModel.setData(fieldName, selectedOption?.value);
    newModel.setData("gitToolId", "");    
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"registry"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={REGISTRY_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Registry"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

ContainerCliRegistrySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ContainerCliRegistrySelectInput;
