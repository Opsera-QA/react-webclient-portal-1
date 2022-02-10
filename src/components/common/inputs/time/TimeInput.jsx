import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Timepicker} from "dhx-suite-package";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faClock} from "@fortawesome/pro-light-svg-icons";
import CalendarInputBase from "components/common/inputs/date/CalendarInputBase";
import TimeInputBase from "components/common/inputs/time/TimeInputBase";

// TODO: Utilize Opsera colors
function TimeInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, customTitle }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const containerRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timepicker = setUpTimepicker();

    return () => {
      timepicker.destructor();
    };
  }, [dataObject, disabled]);

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

  const setUpTimepicker = () => {
    let timepicker = new Timepicker(containerRef.current, {
      value: dataObject.getData(fieldName)
    });

    if (disabled) {
      timepicker.disable();
    }
    else {
      timepicker.events.on("Change", (value) => {
        validateAndSetData(value);
      });
    }

    return timepicker;
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={"h-100 my-2"}>
      <div className={"content-container h-100"}>
        <InputTitleBar icon={faClock} field={field} customTitle={customTitle} />
        <TimeInputBase
          disabled={disabled}
          setDataFunction={validateAndSetData}
          data={dataObject?.getData(fieldName)}
        />
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
    );
}

TimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  customTitle: PropTypes.string
};

export default TimeInput;