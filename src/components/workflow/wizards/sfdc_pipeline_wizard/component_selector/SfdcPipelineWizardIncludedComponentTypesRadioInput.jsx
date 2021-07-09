import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SfdcPipelineWizardIncludedComponentTypesRadioInput({ fieldName, pipelineWizardModel, setPipelineWizardModel, disabled}) {
  return (
    <RadioButtonInputContainer dataObject={pipelineWizardModel} fieldName={fieldName}>
      <Row className={"py-1"}>
        <Col sm={12} md={4}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            value={"all"}
            label={<div><strong>All</strong></div>}
          />
        </Col>
        <Col sm={12} md={4}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            value={"managed"}
            label={<div><strong>Managed</strong></div>}
          />
        </Col>
        <Col sm={12} md={4}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            value={"custom"}
            label={<div><strong>Custom</strong></div>}
          />
        </Col>
      </Row>
    </RadioButtonInputContainer>
  );
}

SfdcPipelineWizardIncludedComponentTypesRadioInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcPipelineWizardIncludedComponentTypesRadioInput.defaultProps = {
  fieldName: "includedComponentTypes",
};

export default SfdcPipelineWizardIncludedComponentTypesRadioInput;