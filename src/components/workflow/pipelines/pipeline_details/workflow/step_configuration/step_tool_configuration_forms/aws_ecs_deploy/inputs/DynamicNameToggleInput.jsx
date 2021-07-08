import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function DynamicNameToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData("ecsServiceName", "");
    newDataObject.setData(fieldName, sourceScriptFlag);
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => handleChange()}
      />
      <small className="text-muted form-text"> Generate ECS Service Names dynamically on runtime based on the Pipeline ID and Run Count.</small>
    </InputContainer>
  );
}

DynamicNameToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default DynamicNameToggleInput;