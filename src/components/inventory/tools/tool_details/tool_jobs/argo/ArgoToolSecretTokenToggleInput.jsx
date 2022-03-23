import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoToolSecretTokenToggleInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setData("accountPassword", "");
    newModel.setData("secretAccessTokenKey", "");
    newModel.setData("userName", "");
    setModel({...newModel});
  };


  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
    />
  );
}

ArgoToolSecretTokenToggleInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

ArgoToolSecretTokenToggleInput.defaultProps = {
  fieldName: "secretAccessTokenEnabled"
};

export default ArgoToolSecretTokenToggleInput;
