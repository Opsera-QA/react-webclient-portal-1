import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function StepConfigUseTerraformOutput({dataObject, setDataObject, fieldName, disabled, plan}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData("useTerraformOutput");
    newDataObject.setData("useTerraformOutput", sourceScriptFlag);
    let customParameters = dataObject.getData("customParameters");
    if (!sourceScriptFlag) {
      newDataObject.setData("terraformStepId", "");
    }
    if (!sourceScriptFlag && customParameters.length > 0) {
      let filtered = [];
      for (let item in customParameters) {
        if (!customParameters[item]?.outputKey) {
          filtered.push(customParameters[item]);
        }
      }
      newDataObject.setData("customParameters", filtered);
    }
    setDataObject({...newDataObject});
  };

  return (
    <>
      <InputContainer>
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

StepConfigUseTerraformOutput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array
};

export default StepConfigUseTerraformOutput;