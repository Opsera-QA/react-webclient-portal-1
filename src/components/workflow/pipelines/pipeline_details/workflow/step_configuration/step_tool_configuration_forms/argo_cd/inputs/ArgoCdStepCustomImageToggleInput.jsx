import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoCdStepCustomImageToggleInput({ model, setModel, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption);
    newModel.setDefaultValue("rollbackEnabled");
    newModel.setDefaultValue("platform");
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("resource");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({ ...newModel });
  };

  return (
    <BooleanToggleInput
      fieldName={"customImageTag"}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

ArgoCdStepCustomImageToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoCdStepCustomImageToggleInput;
