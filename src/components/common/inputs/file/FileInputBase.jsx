import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function FileInputBase({ fieldName, dataObject, setDataObject, disabled, inputPopover }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer>
      <InputLabel field={field} inputPopover={inputPopover} />
      <input
        type={"file"}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

FileInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  inputPopover: PropTypes.object,
  disabled: PropTypes.bool
};

export default FileInputBase;