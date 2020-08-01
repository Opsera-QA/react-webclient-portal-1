import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import validate from "../../../utils/formValidation";

function ToggleInput({ field, formData, setData }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isValid, setIsValid] = useState(true);

    // TODO: remove or enable, if (un)necessary
    const validateAndSetData = (field, value) => {
        let { isValid, errorMessage } = validate(value, field);
        setIsValid(isValid);
        setErrorMessage(errorMessage);
        setData(field.id, value);
    };

  return (
    field &&
        // TODO: Extract into regular inputs for easier maintenance/styling
        // TODO: Make custom-toggle-input css
        <>
          <Form.Group className="custom-text-input" controlId={field.id}>
            <Form.Label>
              <span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null }</span>
            </Form.Label>
            <Form.Check
              type="switch"
              id={field.id}
              checked={!!formData[field.id]}
              label="Active"
              placeholder="Please select"
              onChange={() => {
                  setData(field.id, !formData[field.id]);
              }}
            />
            <Form.Control.Feedback type="invalid">
              <div>{errorMessage}</div>
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              <div>{field.fieldText}</div>
            </Form.Text>
          </Form.Group>
        </>
  );
}

ToggleInput.propTypes = {
  setData: PropTypes.func,
  field: PropTypes.object,
  formData: PropTypes.object
};

export default ToggleInput;