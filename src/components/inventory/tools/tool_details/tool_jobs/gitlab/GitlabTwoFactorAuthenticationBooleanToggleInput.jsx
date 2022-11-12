import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function GitlabTwoFactorAuthenticationBooleanToggleInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model?.setData(fieldName, newValue);
    model?.setDefaultValue("secretPrivateKey");
    model?.setDefaultValue("secretAccessTokenKey");
    model?.setDefaultValue("accountPassword");
    setModel({...model});
  };

  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      fieldName={"twoFactorAuthentication"}
      disabled={disabled}
    />
  );
}

GitlabTwoFactorAuthenticationBooleanToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

export default GitlabTwoFactorAuthenticationBooleanToggleInput;