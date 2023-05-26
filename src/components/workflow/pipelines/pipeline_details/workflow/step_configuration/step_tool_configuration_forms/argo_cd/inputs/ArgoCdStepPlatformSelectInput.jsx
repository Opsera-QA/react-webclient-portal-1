import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const PLATFORM_IDENTIFIERS = [
  {
    name: "Azure",
    value: "azure",
  }
];

function ArgoCdStepPlatformSelectInput({model, setModel, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption.value);
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("resource");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({...newModel});    
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("platform");
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("resource");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({...newModel});
  };

  return (
    <SelectInputBase
      setDataObject={setModel}
      textField={"name"}
      valueField={"value"}
      dataObject={model}
      selectOptions={PLATFORM_IDENTIFIERS}
      fieldName={"platform"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

ArgoCdStepPlatformSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoCdStepPlatformSelectInput;
