import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import NumberPicker from "react-widgets/lib/NumberPicker";
import simpleNumberLocalizer from "react-widgets-simple-number";

export const formatTypes = {
  percent: '%'
};

function NumberInputBase({ fieldName, dataObject, setDataObject, disabled, placeholderText, formatType, setDataFunction, showLabel, minimum, maximum, className, precision }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  simpleNumberLocalizer();

  const validateAndSetData = (newValue) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, newValue);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    }
    else {
      validateAndSetData(newValue);
    }
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
        onChange={(newValue) => updateValue(newValue)}
        min={typeof minimum === "number" ? minimum : field?.minNumber}
        max={typeof maximum === "number" ? maximum : field?.maxNumber}
        format={ formatType && formatTypes[formatType] != null ? formatTypes[formatType] : undefined}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

NumberInputBase.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  formatType: PropTypes.string,
  setDataFunction: PropTypes.func,
  showLabel: PropTypes.bool,
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  className: PropTypes.string,
  precision: PropTypes.number
};

export default NumberInputBase;