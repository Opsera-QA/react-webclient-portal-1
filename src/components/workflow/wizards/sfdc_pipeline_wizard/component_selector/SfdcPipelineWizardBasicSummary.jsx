import React from "react";
import PropTypes from "prop-types";
import {Row, Col} from "react-bootstrap";

import ToolNameField from "components/common/fields/inventory/ToolNameField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

const SfdcPipelineWizardBasicSummary = ({pipelineWizardModel}) => (
  <Row className="my-3 p-3 message-field info-message-field mx-1">
    <Col md="auto">
      <ToolNameField
        model={pipelineWizardModel}
        fieldName={"sfdcToolId"}
      />
    </Col>
    {pipelineWizardModel.getData('isOrgToOrg') 
      ? 
        <Col md="auto">
          <ToolNameField
            model={pipelineWizardModel}
            fieldName={"sfdcDestToolId"}
          />
        </Col>
      : 
      <>
        <Col md="auto">
          <ToolNameField
            model={pipelineWizardModel}
            fieldName={"gitToolId"}
          />
        </Col>
        {pipelineWizardModel.getData('service') === 'bitbucket' && (
          <Col md="auto">
            <TextFieldBase
              dataObject={pipelineWizardModel}
              fieldName={"workspace"}
            />
          </Col>
        )}
        <Col md="auto">
          <TextFieldBase
            dataObject={pipelineWizardModel}
            fieldName={"repository"}
          />
        </Col>
        <Col md="auto">
          <TextFieldBase
            dataObject={pipelineWizardModel}
            fieldName={"gitBranch"}
          />
        </Col>
      </>
    }
  </Row>
);

SfdcPipelineWizardBasicSummary.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SfdcPipelineWizardBasicSummary;