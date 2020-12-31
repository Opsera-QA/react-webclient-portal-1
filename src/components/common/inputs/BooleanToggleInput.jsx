import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InfoText from "../form_fields/input/InfoText";
import InputLabel from "../form_fields/input/InputLabel";

// TODO: Move into /boolean in a separate request
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
        <InputLabel field={field} />
        <Form.Check
          type="switch"
          id={field.id}
          checked={!!dataObject.getData(fieldName)}
          disabled={disabled}
          label={dataObject.getData(fieldName) ? "True" : "False"}
          onChange={() => {validateAndSetData(!dataObject.getData(fieldName));
          }}
        />
      </div>
      <InfoText field={field} errorMessage={null} />
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