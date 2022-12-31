import React from "react";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PropTypes from "prop-types";

const PackerVariablesFileToggleInput = ({ model, setModel, fieldName, disabled }) => {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    const flag = !model.getData(fieldName);
    newModel.setData(fieldName, flag);
    newModel.setData("inputFilePaths", []);
    newModel.setData("inputParameters", []);
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
    />
  );
};

PackerVariablesFileToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PackerVariablesFileToggleInput;
