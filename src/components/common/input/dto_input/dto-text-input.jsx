import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function DtoTextInput({fieldName, dataObject, setDataObject, disabled, type}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    let errors = newDataObject.isFieldValid(field.id);

    // TODO: Show all errors on all input fields or return just one error
    if ( errors != null && errors !== true) {
       setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }

    setDataObject({...newDataObject});
  };

  return (
    <>
      {dataObject &&
      <div className="form-group m-2">
        <label>{field.label}{field.isRequired ?
          <span className="danger-red">*</span> : null}</label>
        <input type={type} disabled={disabled} value={dataObject.getData(fieldName)} className="form-control"
               onChange={e => validateAndSetData(fieldName, e.target.value)}/>
        <div className="invalid-feedback text-right">
          <div>{errorMessage}</div>
        </div>
        <small className="text-muted form-text text-right">
          <div>{field.formText}</div>
        </small>
      </div>}
    </>
  );
}

DtoTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default DtoTextInput;