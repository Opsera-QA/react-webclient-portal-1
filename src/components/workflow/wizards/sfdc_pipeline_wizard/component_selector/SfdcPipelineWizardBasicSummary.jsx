import React from "react";
import PropTypes from "prop-types";
import {Row, Col} from "react-bootstrap";

import ToolNameField from "components/common/fields/inventory/ToolNameField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

const SfdcPipelineWizardBasicSummary = ({pipelineWizardModel}) => (
  <Row className="my-3 p-3 message-field info-message-field mx-1 justify-content-between">
    <Col md="auto">
      <ToolNameField
        model={pipelineWizardModel}
        fieldName={"sfdcToolId"}
        loadToolInNewWindow={true}
      />
    </Col>
    {pipelineWizardModel.getData('isOrgToOrg') 
      ? 
         pipelineWizardModel.getData("jobTypeId") === 'sfdc-ant-profile' ? <Col xs={12} sm={6}>
          <ToolNameField
            model={pipelineWizardModel}
            fieldName={"sfdcDestToolId"}
            loadToolInNewWindow={true}
          />
        </Col> : null 
      : 
      <>
        <Col md="auto">
          <ToolNameField
            model={pipelineWizardModel}
            fieldName={"gitToolId"}
            loadToolInNewWindow={true}
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