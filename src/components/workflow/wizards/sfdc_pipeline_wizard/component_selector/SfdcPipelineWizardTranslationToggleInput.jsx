import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SfdcPipelineWizardTranslationToggleInput({ fieldName, pipelineWizardModel, setPipelineWizardModel, disabled}) {
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

SfdcPipelineWizardTranslationToggleInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcPipelineWizardTranslationToggleInput.defaultProps = {
  fieldName: "isTranslations",
};

export default SfdcPipelineWizardTranslationToggleInput;