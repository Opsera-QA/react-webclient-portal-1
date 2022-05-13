import React, {useState} from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import jenkinsConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jenkins-connection-metadata";

function JenkinsProxyToggle({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerAuthenticationChange = () => {
    let newDataObject = dataObject;
    let proxyEnable = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, proxyEnable);
    newDataObject.setMetaDataFields(proxyEnable === true ? jenkinsConnectionMetadata.fieldsAlt : jenkinsConnectionMetadata.fields);
    newDataObject.setData("jAuthToken", "");
    newDataObject.setData("jPassword", "");
    newDataObject.setData("proxyUserName", "");
    newDataObject.setData("proxyPassword", "");
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

JenkinsProxyToggle.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default JenkinsProxyToggle;
