import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";

function StandaloneTextInputBase(
  {
    setDataFunction,
    value,
    disabled,
    type,
    className,
    error,
  }) {
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const getInputClasses = () => {
    let classes = `form-control`;

    if (errorMessage !== "") {
      classes += ` border border-danger error-text`;
    }

    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  return (
    <>
      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={(event) => setDataFunction(event.target.value)}
        className={getInputClasses()}
        autoComplete="off"
      />
      <InfoText errorMessage={errorMessage} />
    </>
  );
}

StandaloneTextInputBase.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default StandaloneTextInputBase;