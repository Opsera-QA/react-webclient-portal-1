import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import NumberPickerInputBase from "components/common/inputs/number/picker/base/NumberPickerInputBase";

function GitCustodianCustomEntropyInput({model, setModel, fieldName, disabled, plan}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));
    newDataObject.setDefaultValue("entropy");
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("customEntropy") !== true) {
      return null;
    }
    return (
      <NumberPickerInputBase
        fieldName={"entropy"}
        dataObject={model}
        setDataObject={setModel}
        minimum={2.4}
        maximum={5.0}
        defaultValue={2.4}
        incrementValue={0.1}
      />
    );
  };

  if (model == null) {
    return null;
  }

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
      />
      {getParametersInput()}
    </>
  );
}

GitCustodianCustomEntropyInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array
};

export default GitCustodianCustomEntropyInput;
