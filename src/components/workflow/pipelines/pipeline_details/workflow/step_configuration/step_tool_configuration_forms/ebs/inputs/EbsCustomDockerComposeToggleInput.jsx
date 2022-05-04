import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function EbsCustomDockerComposeToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerCustomDocker = () => {
    let newDataObject = dataObject;
    let customDockerCompose = !dataObject.getData("customDockerCompose");
    newDataObject.setData("customDockerCompose", customDockerCompose);
    newDataObject.setData("dockerComposeScriptId", "");
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => triggerCustomDocker()}
      />
    </InputContainer>

  );
}

EbsCustomDockerComposeToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default EbsCustomDockerComposeToggleInput;