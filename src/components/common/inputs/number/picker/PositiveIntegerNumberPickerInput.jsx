import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {matchesRegex} from "utils/helpers";
import simpleNumberLocalizer from "react-widgets-simple-number";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import NumberPicker from "react-widgets/lib/NumberPicker";
import InfoText from "components/common/inputs/info_text/InfoText";
import regexDefinitions from "utils/regexDefinitions";

function PositiveIntegerNumberPickerInput({ fieldName, className, dataObject, setDataObject, disabled, placeholderText, showLabel, minimum, maximum }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  simpleNumberLocalizer();

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

  const handleKeyPress = (event) => {
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
      <InputLabel field={field} showLabel={showLabel} model={dataObject} />
      <NumberPicker
        placeholder={placeholderText}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        className="max-content-width"
        onChange={(newValue) => validateAndSetData(newValue)}
        onKeyDown={(event) => handleKeyPress(event)}
        min={typeof minimum === "number" ? minimum : field?.minNumber}
        max={typeof minimum === "number" ? maximum : field?.maxNumber}
      />
      <InfoText field={field} errorMessage={errorMessage} customMessage={`${field?.label} must be 0 or a positive whole number`}/>
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
  className: PropTypes.string
};

PositiveIntegerNumberPickerInput.defaultProps = {
  minimum: 0
};

export default PositiveIntegerNumberPickerInput;