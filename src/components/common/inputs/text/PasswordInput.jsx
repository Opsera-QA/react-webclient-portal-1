import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "./TextInputBase";

function PasswordInput({fieldName, dataObject, setDataObject, disabled}) {
  return (
    <TextInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      type={"password"}
      disabled={disabled}
    />
  );
}

PasswordInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default PasswordInput;