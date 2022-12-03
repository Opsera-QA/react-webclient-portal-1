import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneDatePickerInput from "components/common/inputs/date/StandaloneDateTimeInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {hasDateValue} from "components/common/helpers/date/date.helpers";

function DateTimeInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
    showTime,
    minDate,
    maxDate,
    dropUp,
    defaultToNull,
    showClearValueButton,
    className,
    inputHelpOverlay,
    infoOverlay,
    helpTooltipText,
  }) {
  const field = dataObject?.getFieldById(fieldName);
  const [errorMessage, setErrorMessage] = useState("");
  Moment.locale("en");

  useEffect(() => {
    setErrorMessage("");
    if (dataObject && (dataObject?.isNew() !== true || dataObject?.isChanged(fieldName) === true)) {
      setErrorMessage(dataObject?.getFieldError(fieldName));
    }
  }, [dataObject]);

  const validateAndSetData = (value) => {
    if (setDataFunction) {
      const newDataObject = setDataFunction(fieldName, value);

      if (newDataObject) {
        setErrorMessage(newDataObject?.getFieldError(fieldName));
      }
    } else {
      dataObject?.setData(fieldName, value);
      setDataObject({...dataObject});
      setErrorMessage(dataObject?.getFieldError(fieldName));
    }
  };

  const parseAndSetValue = (value) => {
    if (showTime === false) {
      const dateWithoutTime = new Date(value).toISOString().split('T')[0];
      validateAndSetData(dateWithoutTime);
    } else {
      validateAndSetData(value);
    }
  };

  const clearValue = () => {
    if (!setDataFunction && !clearDataFunction) {
      const newValue = defaultToNull === true ? null : dataObject?.getDefaultValue(fieldName);
      validateAndSetData(newValue);
    } else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataFunction = () => {
    if (
      dataObject?.getData(fieldName) != null
      && field?.isRequired !== true
      && disabled !== true
      && showClearValueButton !== false
      && (setDataFunction == null || clearDataFunction != null)
    ) {
      return clearValue;
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className} fieldName={fieldName}>
      <InputLabel
        field={field}
        model={dataObject}
        clearDataFunction={getClearDataFunction()}
        inputHelpOverlay={inputHelpOverlay}
        infoOverlay={infoOverlay}
        hasError={hasStringValue(errorMessage) === true}
        helpTooltipText={helpTooltipText}
      />
      <StandaloneDatePickerInput
        minDate={minDate}
        maxDate={maxDate}
        showTime={showTime}
        disabled={disabled}
        dropUp={dropUp}
        value={hasDateValue(dataObject?.getData(fieldName)) === true ? new Date(dataObject?.getData(fieldName)) : null}
        setDataFunction={parseAndSetValue}
        defaultToNull={defaultToNull}
        hasError={hasStringValue(errorMessage) === true}
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

DateTimeInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  showClearValueButton: PropTypes.bool,
  disabled: PropTypes.bool,
  showTime: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  dropUp: PropTypes.bool,
  defaultToNull: PropTypes.bool,
  className: PropTypes.string,
  inputHelpOverlay: PropTypes.any,
  infoOverlay: PropTypes.any,
  helpTooltipText: PropTypes.string,
};

DateTimeInputBase.defaultProps = {
  showTime: true,
  dropUp: false
};

export default DateTimeInputBase;