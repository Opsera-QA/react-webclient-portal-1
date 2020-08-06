import React from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";

function ToggleField({field, value}) {
  return (
    field &&
    <>
      <div className="my-2">
        <Form.Group className="custom-text-input" controlId={field.id}>
          <Form.Label>
            <span className="text-muted mr-2">{field.label}:</span>
          </Form.Label>
          <Form.Check
            type="switch"
            disabled={true}
            id={field.id}
            checked={value}
            label="Active"
            placeholder="Please select"
            onChange={() => {
            }}
          />
          <Form.Text className="text-muted">
            <div>{field.fieldText}</div>
          </Form.Text>
        </Form.Group>
      </div>
    </>
  );
}

ToggleField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  field: PropTypes.object,
};

export default ToggleField;