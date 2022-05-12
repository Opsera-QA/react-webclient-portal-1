import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function CheckboxInputBase({fieldName, model, setModel, setDataFunction, disabled}) {
  const [field] = useState(model?.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = model;
    newDataObject.setData(fieldName, value);
    setModel({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(newValue);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="checkbox"
        id={field?.id}
        checked={!!model?.getData(fieldName)}
        disabled={disabled}
        label={model?.getLabel(fieldName)}
        onChange={() => {
          updateValue(!model?.getData(fieldName));
        }}
      />
      <InfoText
        field={field}
        model={model}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

CheckboxInputBase.propTypes = {
  disabled: PropTypes.bool,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

export default CheckboxInputBase;