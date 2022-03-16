import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function DockerPushNewRepoToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerNewRepoChange = () => {
    let newDataObject = dataObject;
    let newRepo = !dataObject.getData("newRepo");
    newDataObject.setData("newRepo", newRepo);
    newDataObject.setData("ecrRepoName", "");
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer className={"input-for-" + fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => triggerNewRepoChange()}
      />
    </InputContainer>

  );
}

DockerPushNewRepoToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default DockerPushNewRepoToggleInput;