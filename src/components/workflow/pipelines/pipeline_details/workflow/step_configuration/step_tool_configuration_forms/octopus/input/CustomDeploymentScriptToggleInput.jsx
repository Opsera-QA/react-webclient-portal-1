import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function CustomDeploymentScriptToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("preDeploymentScriptId", "");
    newDataObject.setData("deploymentScriptId", "");
    newDataObject.setData("postDeploymentScriptId", "");
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => handleChange()}
      />
    </InputContainer>
  );
}

CustomDeploymentScriptToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default CustomDeploymentScriptToggleInput;