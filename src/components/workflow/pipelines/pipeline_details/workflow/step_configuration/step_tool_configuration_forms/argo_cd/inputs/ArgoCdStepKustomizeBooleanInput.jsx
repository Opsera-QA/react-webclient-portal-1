import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoCdStepKustomizeBooleanInput({ model, setModel, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption);
    if (newModel?.getData("customImageTag") === true && selectedOption === true) {
      newModel.setData("imageUrl", newModel?.getData("repositoryTag"));
    } else if (selectedOption === false) {
      newModel.setDefaultValue("imageUrl");
    }
    setModel({ ...newModel });
  };

  return (
    <BooleanToggleInput
      fieldName={"kustomizeFlag"}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

ArgoCdStepKustomizeBooleanInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoCdStepKustomizeBooleanInput;
