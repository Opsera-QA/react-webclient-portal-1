import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function DtoTextInput({fieldName, dataObject, setDataObject, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    let errors = newDataObject.isFieldValid(field.id);

    if (errors !== true) {
     console.log("Errors: " + JSON.stringify(errors));
     setErrorMessage(errors[fieldName]);
    }

    // console.log("ErrorCount: " + JSON.stringify(errorCount));
    // setErrorMessage(errorMessage);
    setDataObject({...newDataObject});
  };

  return (
    <>
      {dataObject &&
      <div className="form-group m-2">
        <label>{field.label}{field.isRequired ?
          <span className="danger-red">*</span> : null}</label>
        <input disabled={disabled} defaultValue={dataObject.getData(fieldName)} className="form-control"
               onChange={e => validateAndSetData(fieldName, e.target.value)}/>
        <div className="invalid-feedback">{errorMessage}</div>
        <small className="text-muted form-text">
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
  disabled: PropTypes.bool
};

export default DtoTextInput;