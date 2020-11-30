import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function BooleanToggleInput({ fieldName, dataObject, setDataObject, disabled }) {
    const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(field.id, value);
    setDataObject({...newDataObject});
  };

  return (
    <div className="m-2">
      <div className="d-flex justify-content-between">
        <label>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</label>
        <Form.Check
          type="switch"
          id={field.id}
          checked={!!dataObject.getData(fieldName)}
          disabled={disabled}
          label={dataObject.getData(fieldName) ? "True" : "False"}
          onChange={() => {
            validateAndSetData(field.id, !dataObject.getData(fieldName));
          }}
        />
      </div>
      <small className="text-muted form-text">
        <div>{field.formText}</div>
      </small>
    </div>
  );
}

BooleanToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setData: PropTypes.func
};

export default BooleanToggleInput;