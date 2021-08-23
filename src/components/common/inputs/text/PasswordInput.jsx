import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "./TextInputBase";

function PasswordInput({fieldName, dataObject, setDataObject, disabled, name}) {
  return (
    <TextInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      type={"password"}
      name={name}
      disabled={disabled}
    />
  );
}

PasswordInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

PasswordInput.defaultProps = {
  name: "no-auto-fill " + Math.random(),
};

export default PasswordInput;