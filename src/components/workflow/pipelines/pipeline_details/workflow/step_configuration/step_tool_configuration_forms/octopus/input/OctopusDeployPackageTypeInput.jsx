import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function OctopusDeployPackageTypeInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("deployedPackageFileName", "");
    setDataObject({...newDataObject});
  };

  const getPackageFileNameInput = () => {
    if(dataObject.getData("deployExtractedPackage")){
        return null;
    }
    return (
      <TextInputBase
        setDataObject={setDataObject}
        dataObject={dataObject}
        fieldName={"deployedPackageFileName"}        
      />
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
      {getPackageFileNameInput()}
    </>
  );
}

OctopusDeployPackageTypeInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OctopusDeployPackageTypeInput;