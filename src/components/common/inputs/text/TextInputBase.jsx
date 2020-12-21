import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "../../form_fields/input/InputLabel";
import InfoText from "../../form_fields/input/InfoText";

function TextInputBase({ fieldName, dataObject, setDataObject, disabled, type }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  return (
    <div className="form-group">
      <InputLabel field={field}/>
      <input
        type={type}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </div>
  );
}

TextInputBase.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default TextInputBase;