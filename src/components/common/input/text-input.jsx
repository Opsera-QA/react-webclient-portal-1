import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import validate from "../../../utils/formValidation";

function TextInput({ field, formData, setData, disabled }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateAndSetData = (field, value) => {
    let { isValid, errorMessage } = validate(value, field);
    setIsValid(isValid);
    setErrorMessage(errorMessage);
    setData(field.id, value);
  };

  return (

    field &&
    // TODO: Extract into regular inputs for easier maintenance/styling
    <>
      <Form.Group controlId={field.id}>
        <Form.Label>
          <span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null } </span>
        </Form.Label>
        <Form.Control disabled={disabled} type={field.type} value={formData[field.id] || ""}  isInvalid={!isValid} onChange={e => validateAndSetData(field, e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          <div>{errorMessage}</div>
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          <div>{field.fieldText}</div>
        </Form.Text>
      </Form.Group>

      {/*TODO: make this input generic and extend dto stuff from it*/}
      {/*<div className="form-group custom-text-input">*/}
      {/*  <label>{label}</label>*/}
      {/*  <input disabled={disabled} type="text" value={value}  onChange={e => setDataFunction("", e.target.value)}/>*/}
      {/*  <div className="invalid-feedback">{errorMessage}</div>*/}
      {/*  <small className="text-muted form-text"><div>{formText}</div></small>*/}
      {/*</div>*/}
    </>
  );
}

TextInput.propTypes = {
  setData: PropTypes.func,
  field: PropTypes.object,
  formData: PropTypes.object,
  disabled: PropTypes.bool
};

export default TextInput;