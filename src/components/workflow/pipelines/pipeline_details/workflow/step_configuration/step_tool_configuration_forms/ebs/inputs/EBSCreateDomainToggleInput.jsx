import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";
import ebsStepFormMetadata
from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/ebs/ebs-stepForm-metadata";

function EBSCreateDomainToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerNewDomain = () => {
    let newDataObject = dataObject;
    let createDomain = !dataObject.getData("createDomain");
    if(createDomain) {
      dataObject.setMetaDataFields(ebsStepFormMetadata.fieldsAlt);
    } else {
      dataObject.setMetaDataFields(ebsStepFormMetadata.fields);
    }
    newDataObject.setData("createDomain", createDomain);
    newDataObject.setData("hostedZoneId", "");
    newDataObject.setData("domainName", "");
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
        onChange={() => triggerNewDomain()}
      />
    </InputContainer>

  );
}

EBSCreateDomainToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default EBSCreateDomainToggleInput;