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
          <Form.Group className="custom-text-input" controlId={field.id}>
            <Form.Label>
              <span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null }</span>
            </Form.Label>
            <Form.Check
              type="switch"
              id={field.id}
              checked={!!dataObject.getData(fieldName)}
              disabled={disabled}
              label="Active"
              placeholder="Please select"
              onChange={() => {
                  validateAndSetData(field.id, !dataObject.getData(fieldName));
              }}
            />
            <Form.Control.Feedback type="invalid">
              <div>{errorMessage}</div>
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              <div>{field.formText}</div>
            </Form.Text>
          </Form.Group>
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