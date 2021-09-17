import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function FileInputBase({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    console.log(value);
    if (setDataFunction) {
      newDataObject = setDataFunction(value);
    }
    else {
      newDataObject = {...dataObject};
      newDataObject.setTextData(fieldName, value);
      setDataObject({...newDataObject});
    }
    setErrorMessage(newDataObject.getFieldError(fieldName));
  };

  return (
    <InputContainer>
      <InputLabel field={field} />
      <input
        type={"file"}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        accept=".dat"
        onClick={ e => e.target.value = null}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

FileInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  inputPopover: PropTypes.object,
  disabled: PropTypes.bool
};

export default FileInputBase;