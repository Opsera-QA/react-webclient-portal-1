import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import { hasStringValue } from "components/common/helpers/string-helpers";

// TODO: This is temporary for this sprint. It's a test of more dynamic validation for password/email fields, but should probably have the useEffect in the main textInputBase
function TempTextInput({ fieldName, dataObject, setDataObject, disabled, type, inputClasses, extraActionButtons }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasStringValue(dataObject.getData(fieldName)) === true) {
      setErrorMessage(dataObject.getFieldError(fieldName));
    }
  }, [dataObject]);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const getInputClasses = () => {
    let classes = `form-control`;

    if (errorMessage !== "") {
      classes += ` border border-danger error-text`;
    }

    if (inputClasses) {
      classes += ` ${inputClasses}`;
    }

    return classes;
  };

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        model={dataObject}
        field={field}
        extraActionButtons={extraActionButtons}
        hasError={hasStringValue(errorMessage) === true}
      />
      <input
        type={type}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        className={getInputClasses()}
      />
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

TempTextInput.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  extraActionButtons: PropTypes.any,
  inputClasses: PropTypes.string,
  disabled: PropTypes.bool
};

export default TempTextInput;