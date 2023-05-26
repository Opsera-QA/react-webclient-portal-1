import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneNumberPickerInput from "components/common/inputs/number/picker/base/StandaloneNumberPickerInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
    incrementValue,
    defaultValue,
  }) {
  const field = dataObject?.getFieldById(fieldName);
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (newValue) => {
    dataObject.setTextData(fieldName, newValue);
    setErrorMessage(dataObject.getFieldError(fieldName));
    setDataObject({...dataObject});
  };

  const updateValue = (newValue) => {
    const parsedNewValue = newValue !== null && numberHelpers.hasNumberValue(newValue) === true ? newValue : defaultValue;

    if (setDataFunction) {
      setDataFunction(field?.id, parsedNewValue);
    }
    else {
      validateAndSetData(parsedNewValue);
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
        value={numberHelpers.hasNumberValue(dataObject?.getData(fieldName)) === true ? Number(dataObject?.getData(fieldName)) : undefined}
        setDataFunction={updateValue}
        minimum={typeof minimum === "number" ? minimum : field?.minNumber}
        maximum={typeof maximum === "number" ? maximum : field?.maxNumber}
        formatType={formatType}
        incrementValue={incrementValue}
        defaultValue={defaultValue}
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
  incrementValue: PropTypes.number,
  defaultValue: PropTypes.number,
};

export default NumberPickerInputBase;