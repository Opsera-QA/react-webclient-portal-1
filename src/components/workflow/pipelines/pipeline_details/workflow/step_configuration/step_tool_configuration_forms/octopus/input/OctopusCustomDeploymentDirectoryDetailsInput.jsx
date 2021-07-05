import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function OctopusCustomDeploymentDirectoryDetailsInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("deploymentDirectory", "");
    newDataObject.setData("purge", false);
    setDataObject({...newDataObject});
  };

  const handlePurgeChange = () => {
    let newDataObject = dataObject;
    let flag = !dataObject.getData("purge");
    newDataObject.setData("purge", flag);
    newDataObject.setData("excludeFromPurge", "");
    setDataObject({...newDataObject});
  };

  const getSupportingInputs = () => {
    if(!dataObject.getData(fieldName)){
        return null;
    }
    return (
      <>
        <TextInputBase
          setDataObject={setDataObject}
          dataObject={dataObject}
          fieldName={"deploymentDirectory"}        
        />
        <InputContainer>
          <Form.Check
            type="switch"
            id="purge"
            checked={!!dataObject.getData("purge")}
            disabled={disabled}
            label="Purge"
            onChange={() => handlePurgeChange()}
          />
        </InputContainer>
        {getPurgeInputs()}
      </>
    );
  };

  const getPurgeInputs = () => {
    if(!dataObject.getData("purge")){
        return null;
    }
    return (
      <>
        <TextInputBase
          setDataObject={setDataObject}
          dataObject={dataObject}
          fieldName={"excludeFromPurge"}        
        />
      </>
    );
  };

  if (field == null) {
    return null;
  }

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
      {getSupportingInputs()}
    </>
  );
}

OctopusCustomDeploymentDirectoryDetailsInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OctopusCustomDeploymentDirectoryDetailsInput;