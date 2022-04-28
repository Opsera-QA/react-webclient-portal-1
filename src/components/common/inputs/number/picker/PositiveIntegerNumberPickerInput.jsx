import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {matchesRegex} from "utils/helpers";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import regexDefinitions from "utils/regexDefinitions";
import StandaloneNumberPickerInput from "components/common/inputs/number/picker/base/StandaloneNumberPickerInput";

function PositiveIntegerNumberPickerInput(
  {
    fieldName,
    className,
    dataObject,
    setDataObject,
    disabled,
    placeholderText,
    showLabel,
    minimum,
    maximum,
    inputHelpOverlay,
    infoOverlay,
  }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
  }, [dataObject]);

  const validateAndSetData = (newValue) => {
    let parsedValue = Math.trunc(newValue);
    const numericalFieldRegex = regexDefinitions.numericalField.regex;

    if (typeof parsedValue !== "number") {
      setErrorMessage("Not a Number");
      parsedValue = dataObject.getData(fieldName);
    }

    if (!matchesRegex(numericalFieldRegex, parsedValue)) {
      setErrorMessage("Only Integers or 0 Allowed");
      parsedValue = dataObject.getData(fieldName);
    }

    if (parsedValue < 0) {
      setErrorMessage("Only Positive Integers and 0 Allowed");
      parsedValue = dataObject.getData(fieldName);
    }

    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, parsedValue);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const handleKeyPressFunction = (event) => {
    const allowedKeyCodes = [37, 38, 39, 40, 8, 9, 13, 46];
    const breaksRules = /^[0-9]$/i.test(event.key) !== true && !allowedKeyCodes.includes(event.keyCode);

    if (breaksRules === true) {
      setErrorMessage("Only Positive Integers and 0 Allowed");
      event.preventDefault();
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className ? className : "custom-number-input my-2"}>
      <InputLabel
        field={field}
        showLabel={showLabel}
        model={dataObject}
        inputHelpOverlay={inputHelpOverlay}
        infoOverlay={infoOverlay}
      />
      <StandaloneNumberPickerInput
        placeholdertext={placeholderText}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        setDataFunction={(newValue) => validateAndSetData(newValue)}
        handleKeyPressFunction={handleKeyPressFunction}
        minimum={typeof minimum === "number" ? minimum : field?.minNumber}
        maximum={typeof maximum === "number" ? maximum : field?.maxNumber}
      />
      <InfoText
        field={field}
        errorMessage={errorMessage}
        customMessage={`${field?.label} must be 0 or a positive whole number`}
        model={dataObject}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

PositiveIntegerNumberPickerInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  formatType: PropTypes.string,
  showLabel: PropTypes.bool,
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  className: PropTypes.string,
  inputHelpOverlay: PropTypes.any,
  infoOverlay: PropTypes.any,
};

PositiveIntegerNumberPickerInput.defaultProps = {
  minimum: 0
};

export default PositiveIntegerNumberPickerInput;