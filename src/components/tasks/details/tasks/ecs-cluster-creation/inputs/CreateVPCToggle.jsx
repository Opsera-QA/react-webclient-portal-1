import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function CreateVPCToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData("createVpc");
    newDataObject.setData("createVpc", sourceScriptFlag);
    if (dataObject?.getData("clusterTemplate") === "fargate") {
      newDataObject.setData("vpcCidrBlock", "10.0.0.0/40");
      newDataObject.setData("public_subnet_1", "10.0.0.0/24");
      newDataObject.setData("public_subnet_2", "10.0.1.0/24");
  }
    setDataObject({...newDataObject});
  };

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

CreateVPCToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

CreateVPCToggleInput.defaultProps = {
  fieldName: "createVpc",
};

export default CreateVPCToggleInput;