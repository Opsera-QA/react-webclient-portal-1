import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneNumberPickerInput from "components/common/inputs/number/picker/base/StandaloneNumberPickerInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

function NumberPickerInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    placeholderText,
    formatType,
    setDataFunction,
    showLabel,
    minimum,
    maximum,
    className,
    inputHelpOverlay,
    infoOverlay,
    helpTooltipText,
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

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
    <InputContainer className={className ? className : "custom-number-input my-2"} fieldName={fieldName}>
      <InputLabel
        field={field}
        showLabel={showLabel}
        model={dataObject}
        inputHelpOverlay={inputHelpOverlay}
        infoOverlay={infoOverlay}
        hasError={hasStringValue(errorMessage) === true}
        helpTooltipText={helpTooltipText}
      />
      <StandaloneNumberPickerInput
        placeholderText={placeholderText}
        disabled={disabled}
        value={dataObject?.getData(fieldName)}
        setDataFunction={updateValue}
        minimum={typeof minimum === "number" ? minimum : field?.minNumber}
        maximum={typeof maximum === "number" ? maximum : field?.maxNumber}
        formatType={formatType}
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

NumberPickerInputBase.propTypes = {
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
  precision: PropTypes.number,
  inputHelpOverlay: PropTypes.any,
  infoOverlay: PropTypes.any,
  helpTooltipText: PropTypes.string,
};

export default NumberPickerInputBase;