import React, {useState} from "react";
import PropTypes from "prop-types";
import commandLineStepFormMetadata from "../commandline-stepForm-metadata";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function CommandLineSourceScriptToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerAuthenticationChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData("sourceScript");
    newDataObject.setData("sourceScript", sourceScriptFlag);
    newDataObject.setMetaDataFields(sourceScriptFlag === true ? commandLineStepFormMetadata.fieldsAlt : commandLineStepFormMetadata.fields);
    newDataObject.setData("commands", "");
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
        onChange={() => triggerAuthenticationChange()}
      />
    </InputContainer>

  );
}

CommandLineSourceScriptToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default CommandLineSourceScriptToggleInput;