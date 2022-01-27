import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SfdcPipelineWizardComponentTypesBooleanInput({ fieldName, pipelineWizardModel, setPipelineWizardModel, disabled}) {
  return (
      <Row className={"py-1"}>
        <Col sm={12} md={4}>
          <BooleanToggleInput
            disabled={disabled} 
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
          />
        </Col>
      </Row>
  );
}

SfdcPipelineWizardComponentTypesBooleanInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcPipelineWizardComponentTypesBooleanInput.defaultProps = {
  fieldName: "isTranslations",
};

export default SfdcPipelineWizardComponentTypesBooleanInput;