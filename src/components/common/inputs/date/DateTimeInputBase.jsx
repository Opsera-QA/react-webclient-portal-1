import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneDatePickerInput from "components/common/inputs/date/StandaloneDateTimeInput";

function DateTimeInputBase({ fieldName, dataObject, setDataObject, setDataFunction, disabled, showTime, minDate, maxDate, dropUp }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  Moment.locale("en");

  useEffect(() => {
    if (dataObject.getData(fieldName) !== "") {
      setErrorMessage(dataObject.getFieldError(fieldName));
    }
  }, [dataObject]);

  // TODO: When creating next date input, ensure fieldName is sent back for more complex functions
  const validateAndSetData = (value) => {
    let newDataObject;
    if (setDataFunction) {
      newDataObject = setDataFunction(value);
    }
    else {
      newDataObject = {...dataObject};
      newDataObject.setData(fieldName, value);
      setDataObject({...newDataObject});
    }

    setErrorMessage(newDataObject.getFieldError(fieldName));
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
        value={new Date(dataObject?.getData(fieldName))}
        setDataFunction={validateAndSetData}
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
  showTime: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  dropUp: PropTypes.bool
};

DateTimeInputBase.defaultProps = {
  showTime: true,
  dropUp: false
};

export default DateTimeInputBase;