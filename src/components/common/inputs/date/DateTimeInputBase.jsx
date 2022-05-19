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
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  Moment.locale("en");

  useEffect(() => {
    if (hasStringValue(dataObject.getData(fieldName)) === true) {
      setErrorMessage(dataObject.getFieldError(fieldName));
    }
  }, [dataObject]);

  const validateAndSetData = (value) => {
    if (value) {
      let newDataObject;
      if (setDataFunction) {
        newDataObject = setDataFunction(fieldName, value);
      } else {
        newDataObject = {...dataObject};
        newDataObject.setData(fieldName, value);
        setDataObject({...newDataObject});
      }

      if (newDataObject) {
        setErrorMessage(newDataObject.getFieldError(fieldName));
      }
    }
  };

  const clearValue = () => {
    if (!setDataFunction && !clearDataFunction) {
      validateAndSetData(fieldName, dataObject?.getDefaultValue(fieldName));
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataFunction = () => {
    if (
      dataObject?.getData(fieldName) != null
      && disabled !== true
      && showClearValueButton !== false
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
      />
      <StandaloneDatePickerInput
        minDate={minDate}
        maxDate={maxDate}
        showTime={showTime}
        disabled={disabled}
        dropUp={dropUp}
        value={hasDateValue(dataObject?.getData(fieldName)) === true ? new Date(dataObject?.getData(fieldName)) : null}
        setDataFunction={validateAndSetData}
        defaultToNull={defaultToNull}
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
};

DateTimeInputBase.defaultProps = {
  showTime: true,
  dropUp: false
};

export default DateTimeInputBase;