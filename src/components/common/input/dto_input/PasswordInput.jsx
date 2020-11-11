import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function PasswordInput({fieldName, dataObject, setDataObject, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  useEffect(() => {
    checkValidation(dataObject);
  }, [dataObject]);

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;

    if (field.lowercase === true) {
      value = value.toLowerCase();
    }
    else if (field.uppercase === true) {
      value = value.toUpperCase();
    }

    // The input mask will limit text entry,
    // but complex validation can be done by using
    // "regexValidator" in metadata to not prevent text entry
    if (field.inputMaskRegex != null) {
      let format = field.inputMaskRegex;
      let meetsRegex = format.test(value);

      if (value !== '' && !meetsRegex) {
        return;
      }
    }

    newDataObject.setData(fieldName, value);
    checkValidation(newDataObject);
    setDataObject({...newDataObject});
  };

  const checkValidation = (newDataObject) => {
    let errors = newDataObject.isFieldValid(field.id);

    if ( errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }
  };

  const getInfoText = () => {
    if (errorMessage != null && errorMessage !== "") {
      return (
        <div className="invalid-feedback">
          <div>{errorMessage}</div>
        </div>
      );
    }

    return (
      <small className="text-muted form-text">
        <div>{field.formText}</div>
      </small>
    )
  }

  return (
    <>
      {dataObject &&
      <div className="form-group m-2">
        <label>{field.label}{field.isRequired ?
          <span className="danger-red">*</span> : null}</label>
        <input type={"password"} disabled={disabled} value={dataObject.getData(fieldName)} className="form-control"
               onChange={e => validateAndSetData(fieldName, e.target.value)}/>
        {getInfoText()}
      </div>}
    </>
  );
}

PasswordInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default PasswordInput;