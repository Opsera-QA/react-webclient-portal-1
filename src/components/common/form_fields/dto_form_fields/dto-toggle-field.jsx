import React, {useState} from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";

function DtoToggleField({dataObject, fieldName}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  // TODO: Rewrite to pull from toggleField
  return (
    dataObject &&
    <>
      <div className="my-2">
        <Form.Group className="custom-text-input" controlId={field.id}>
          <Form.Label>
            <span className="text-muted mr-2">{field.label}:</span>
          </Form.Label>
          <Form.Check
            type="switch"
            disabled={true}
            id={field.id + "field"}
            checked={dataObject.getData(fieldName)}
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

DtoToggleField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default DtoToggleField;