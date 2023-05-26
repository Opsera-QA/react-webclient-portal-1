import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function GitCustodianAdvancedOptionsInput({model, setModel, fieldName, disabled, plan}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));    
    newDataObject.setDefaultValue("reposToScan");
    setModel({...newDataObject});
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
    </>
  );
}

GitCustodianAdvancedOptionsInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array
};

export default GitCustodianAdvancedOptionsInput;
