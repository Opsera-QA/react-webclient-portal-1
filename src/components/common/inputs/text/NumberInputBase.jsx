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

function NumberInputBase({ fieldName, dataObject, setDataObject, disabled, placeholderText, formatType, setDataFunction, showLabel }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  simpleNumberLocalizer();

  const validateAndSetData = (newValue) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, newValue);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className="custom-number-input my-2">
      <InputLabel field={field} showLabel={showLabel} />
      <NumberPicker
        type="number"
        placeholder={placeholderText}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        className="max-content-width"
        onChange={setDataFunction ? (newValue) => setDataFunction(field?.id, newValue) : (newValue) => validateAndSetData(newValue)}
        min={field?.getMaxNumber}
        max={field?.getMinNumber}
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
  showLabel: PropTypes.bool
};

export default NumberInputBase;