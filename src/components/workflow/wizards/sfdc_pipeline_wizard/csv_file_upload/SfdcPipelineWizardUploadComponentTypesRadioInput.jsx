import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SfdcPipelineWizardUploadComponentTypesRadioInput({ fieldName, pipelineWizardModel, setPipelineWizardModel, disabled}) {
  return (
    <RadioButtonInputContainer dataObject={pipelineWizardModel} fieldName={fieldName}>
      <Row className={"py-1"}>
        <Col sm={12} md={4}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            value={"sfdc"}
            label={<div><strong>From SFDC</strong></div>}
          />
        </Col>
        <Col sm={12} md={4}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            value={"git"}
            label={<div><strong>From GIT</strong></div>}
          />
        </Col>
      </Row>
    </RadioButtonInputContainer>
  );
}

SfdcPipelineWizardUploadComponentTypesRadioInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcPipelineWizardUploadComponentTypesRadioInput.defaultProps = {
  fieldName: "modifiedFilesOrigin",
};

export default SfdcPipelineWizardUploadComponentTypesRadioInput;