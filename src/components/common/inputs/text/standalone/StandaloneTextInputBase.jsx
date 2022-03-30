import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";
import {InputGroup} from "react-bootstrap";

function StandaloneTextInputBase(
  {
    setDataFunction,
    onKeyPressFunction,
    value,
    disabled,
    type,
    className,
    error,
    placeholderText,
    rightSideInputButton,
    field,
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

  const getInputBody = () => {
    return (
      <input
        placeholder={placeholderText}
        type={type}
        disabled={disabled}
        value={value}
        onChange={(event) => setDataFunction(event.target.value)}
        className={getInputClasses()}
        autoComplete={"off"}
        onKeyPress={onKeyPressFunction}
      />
    );
  };

  const getInput = () => {
    if (rightSideInputButton != null) {
      return (
        <InputGroup className={"flex-nowrap text-input-with-button"}>
          {getInputBody()}
          <InputGroup.Append>
            {rightSideInputButton}
          </InputGroup.Append>
        </InputGroup>
      );
    }

    return (
      <div className={"d-flex"}>
        {getInputBody()}
      </div>
    );
  };

  return (
    <div>
      {getInput()}
      <div>
        <InfoText
          errorMessage={errorMessage}
          field={field}
        />
      </div>
    </div>
  );
}

StandaloneTextInputBase.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func.isRequired,
  onKeyPressFunction: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  placeholderText: PropTypes.string,
  rightSideInputButton: PropTypes.object,
  field: PropTypes.object,
};

export default StandaloneTextInputBase;