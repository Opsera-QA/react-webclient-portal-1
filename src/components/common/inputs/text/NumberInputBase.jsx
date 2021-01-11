import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/fields/input/InputLabel";
import InfoText from "components/common/fields/input/InfoText";
import NumberPicker from "react-widgets/lib/NumberPicker";
import simpleNumberLocalizer from "react-widgets-simple-number";

function NumberInputBase({ fieldName, dataObject, setDataObject, disabled, placeholderText }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  simpleNumberLocalizer();

  const validateAndSetData = (newValue) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, newValue);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer>
      <InputLabel field={field}/>
      <NumberPicker
        type="number"
        placeholder={placeholderText}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        className="max-content-width"
        onChange={(newValue) => validateAndSetData(newValue)}
        min={field?.getMaxNumber}
        max={field?.getMinNumber}
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
  disabled: PropTypes.bool
};

export default NumberInputBase;