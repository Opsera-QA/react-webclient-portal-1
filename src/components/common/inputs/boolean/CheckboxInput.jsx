import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function CheckboxInput({ fieldName, model, setModel, disabled }) {
    const [field] = useState(model?.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = model;
    newDataObject.setData(field.id, !!value);
    setModel({...newDataObject});
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <Form.Check
        type="checkbox"
        id={field?.id}
        checked={!!model?.getData(fieldName)}
        disabled={disabled}
        label={model?.getLabel(fieldName)}
        onChange={() => {
          validateAndSetData(!model?.getData(fieldName));
        }}
      />
      <InfoText field={field} errorMessage={null}/>
    </InputContainer>
  );
}

CheckboxInput.propTypes = {
  disabled: PropTypes.bool,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

export default CheckboxInput;