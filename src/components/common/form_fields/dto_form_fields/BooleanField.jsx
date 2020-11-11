import React, {useState} from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";

function BooleanField({dataObject, fieldName}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  return (
    dataObject &&
    <>
      <div className="my-2 custom-text-field d-flex">
          <label><span className="text-muted mr-2">{field.label}:</span></label>
          <Form.Check
            type="switch"
            disabled={true}
            id={field.id + "field"}
            checked={dataObject.getData(fieldName)}
            label={dataObject.getData(fieldName) ? "True" : "False"}
            onChange={() => {
            }}
          />
      </div>
    </>
  );
}

BooleanField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default BooleanField;