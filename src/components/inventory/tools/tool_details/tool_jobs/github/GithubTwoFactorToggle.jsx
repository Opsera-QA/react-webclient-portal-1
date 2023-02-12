import React, {useState} from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import githubConnectionMetadata from "./github-connection-metadata";
import InputContainer from "components/common/inputs/InputContainer";

function GithubTwoFactorToggle({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerAuthenticationChange = () => {
    let newDataObject = dataObject;
    let twoFactorAuthentication = !dataObject.getData("twoFactorAuthentication");
    newDataObject.setData("twoFactorAuthentication", twoFactorAuthentication);
    newDataObject.setMetaDataFields(twoFactorAuthentication === true ? githubConnectionMetadata.fieldsAlt : githubConnectionMetadata.fields);
    newDataObject.setData("secretPrivateKey", "");
    newDataObject.setData("secretAccessTokenKey", "");
    newDataObject.setData("accountPassword", "");
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

GithubTwoFactorToggle.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default GithubTwoFactorToggle;