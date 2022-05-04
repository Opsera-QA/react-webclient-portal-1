import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import { Form } from "react-bootstrap";

function ResourceGroupToggleInput({ model, setModel, fieldName, disabled }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = model;
    let sourceScriptFlag = !model.getData(fieldName);
    newDataObject.setData("resourceGroupName", "");
    newDataObject.setData(fieldName, sourceScriptFlag);
    setModel({ ...newDataObject });
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!model.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => handleChange()}
      />
    </InputContainer>
  );
}

ResourceGroupToggleInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ResourceGroupToggleInput;
