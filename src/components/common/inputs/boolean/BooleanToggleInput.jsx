import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function BooleanToggleInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(fieldName, newValue);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <Form.Check
        type="switch"
        className={"toggle-alignment"}
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => {
          updateValue(!dataObject.getData(fieldName));
        }}
      />
      <InfoText
        field={field}
        model={dataObject}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

BooleanToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func
};

export default BooleanToggleInput;