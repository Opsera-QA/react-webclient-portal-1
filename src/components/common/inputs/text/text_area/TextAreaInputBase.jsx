import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";

function TextAreaInputBase(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    rowCount,
    disabled,
    error,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setField(model?.getFieldById(fieldName));
  }, [fieldName]);

  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const validateAndSetData = (value) => {
    const newModel = model;
    newModel.setTextData(fieldName, value);
    setErrorMessage(newModel?.getFieldError(fieldName));
    setModel({...newModel});
  };

  const updateValue = (newValue) => {
    if (typeof newValue !== "string") {
      setErrorMessage(`${field?.label} must be a string.`);
      return;
    }

    if (setDataFunction) {
      const newDataObject = setDataFunction(fieldName, newValue);

      if (newDataObject) {
        setErrorMessage(newDataObject?.getFieldError(fieldName));
      }
    }
    else {
      validateAndSetData(newValue);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InputLabel
        model={model}
        field={field}
      />
      <textarea
        disabled={disabled}
        onChange={(event) => updateValue(event.target.value)}
        className={"form-control"}
        rows={rowCount}
      />
      <InfoText
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

TextAreaInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  rowCount: PropTypes.number,
};

TextAreaInputBase.defaultProps = {
  rowCount: 5,
};

export default TextAreaInputBase;