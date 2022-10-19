import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function FortifyStepClientThresholdToggleInput({ model, setModel }) {

  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("clientSideThreshold", !model.getData("clientSideThreshold"));
    newDataObject.setDefaultValue("thresholdVulnerability");
    setModel({ ...newDataObject });
  };

  return (
    <BooleanToggleInput
      fieldName={"clientSideThreshold"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
    />
  );
}

FortifyStepClientThresholdToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default FortifyStepClientThresholdToggleInput;
