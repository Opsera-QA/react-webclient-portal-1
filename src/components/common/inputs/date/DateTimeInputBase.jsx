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
    disabled,
    showTime,
    minDate,
    maxDate,
    dropUp,
    defaultToNull,
  }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
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

      setErrorMessage(newDataObject.getFieldError(fieldName));
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InputLabel field={field} model={dataObject} />
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
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

DateTimeInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showDate: PropTypes.bool,
  dropUp: PropTypes.bool,
  showTime: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  defaultToNull: PropTypes.bool,
};

DateTimeInputBase.defaultProps = {
  showTime: true,
  dropUp: false
};

export default DateTimeInputBase;