import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Timepicker} from "dhx-suite-package";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faClock} from "@fortawesome/pro-light-svg-icons";

// TODO: Utilize Opsera colors
function TimeInputBase({ fieldName, dataObject, setDataObject, disabled, setDataFunction }) {
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
    <InputContainer>
      <div className={"content-container"}>
        <InputTitleBar icon={faClock} field={field} />
        <div className={"w-100"} id="timePicker" ref={el => (containerRef.current = el)}/>
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
    );
}

TimeInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func
};

export default TimeInputBase;