import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function RollbackToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData("isRollback");
    newDataObject.setData("isRollback", sourceScriptFlag);
    newDataObject.setData("octopusVersion", undefined);
    setDataObject({...newDataObject});
  };

  if (dataObject?.getData("octopusPlatformType") && dataObject?.getData("octopusPlatformType") === "Script" &&
    dataObject?.getData("scriptSource") && dataObject?.getData("scriptSource") === "inline") {
    return null;
  }

  return (
    <>
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
</>
  );
}

RollbackToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default RollbackToggleInput;