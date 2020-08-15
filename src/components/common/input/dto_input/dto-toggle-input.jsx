import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function DtoToggleInput({ fieldName, dataObject, setDataObject, disabled }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);

    // TODO: If necessary implement
    // let errors = dataObject.isFieldValid(field.id);
    // if (errors !== true) {
    //   console.log("Errors: " + JSON.stringify(errors));
    //   setErrorMessage(errors[fieldName]);
    // }

    setDataObject({...newDataObject});
  };

  return (
    field &&
        // TODO: Extract into regular inputs for easier maintenance/styling
        // TODO: Make custom-toggle-input css
        <>
          <div className="form-group custom-text-input m-2">
            <label>{field.label}{field.isRequired ?
              <span className="danger-red">*</span> : null}</label>
            <Form.Check
              type="switch"
              id={field.id}
              checked={!!dataObject.getData(fieldName)}
              disabled={disabled}
              label={!!dataObject.getData(fieldName) ? "Active" : "Inactive"}
              placeholder="Please select"
              onChange={() => {
                  validateAndSetData(field.id, !dataObject.getData(fieldName));
              }}
            />
            <div className="invalid-feedback">{errorMessage}</div>
            <small className="text-muted form-text">
              <div>{field.formText}</div>
            </small>
          </div>
        </>
  );
}

DtoToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object
};

export default DtoToggleInput;