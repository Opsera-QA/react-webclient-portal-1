import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import { Form } from "react-bootstrap";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import FieldContainer from "../../../../../../../../common/fields/FieldContainer";


function DeleteResourceToggleInput({ dataObject, setDataObject, fieldName, disabled, pipelineId }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData("ecsDeleteResource", "");
    newDataObject.setData(fieldName, sourceScriptFlag);
    setDataObject({ ...newDataObject });
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
      <small className="text-muted form-text">
        Delete the resource at the selected port before service deployment.
      </small>
    </InputContainer>
  );
}

DeleteResourceToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  pipelineId: PropTypes.string,
};

export default DeleteResourceToggleInput;
