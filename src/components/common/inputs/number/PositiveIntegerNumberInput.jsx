import React, {useState} from "react";
import PropTypes from "prop-types";
import regexHelpers from "utils/regexHelpers";
import {matchesRegex} from "utils/helpers";
import simpleNumberLocalizer from "react-widgets-simple-number";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import NumberPicker from "react-widgets/lib/NumberPicker";
import InfoText from "components/common/inputs/info_text/InfoText";

function PositiveIntegerNumberInput({ fieldName, className, dataObject, setDataObject, disabled, placeholderText, showLabel, minimum, maximum }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  simpleNumberLocalizer();

  const validateAndSetData = (newValue) => {
    const parsedValue = Math.trunc(newValue);

    console.log("parsedValue: " + JSON.stringify(parsedValue));

    if (typeof parsedValue !== "number") {
      setErrorMessage("Not a Number");
      return;
    }

    if (!matchesRegex(regexHelpers.regexTypes.numericalField, parsedValue)) {
      setErrorMessage("Only Integers or 0 Allowed");
      return;
    }

    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, parsedValue);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className ? className : "custom-number-input my-2"}>
      <InputLabel field={field} showLabel={showLabel} />
      <NumberPicker
        placeholder={placeholderText}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        className="max-content-width"
        onChange={(newValue) => validateAndSetData(newValue)}
        min={typeof minimum === "number" ? minimum : field?.minNumber}
        max={typeof minimum === "number" ? maximum : field?.maxNumber}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

PositiveIntegerNumberInput.propTypes = {
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

PositiveIntegerNumberInput.defaultProps = {
  minimum: 0
};

export default PositiveIntegerNumberInput;