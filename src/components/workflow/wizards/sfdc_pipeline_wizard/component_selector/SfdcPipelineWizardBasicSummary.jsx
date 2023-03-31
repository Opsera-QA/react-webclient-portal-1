import React from "react";
import PropTypes from "prop-types";
import {Row, Col} from "react-bootstrap";

import ToolNameFieldDisplayer from "components/common/fields/inventory/name/ToolNameFieldDisplayer";

const SfdcPipelineWizardBasicSummary = ({pipelineWizardModel}) => (
  <Row className="my-3 p-3 message-field warning-message-field mx-1">
    {pipelineWizardModel.getData('isOrgToOrg') 
      ? 
        <>
          <Col sm={12} lg={6}>
            <div>
              <span className="text-muted">SFDC Tool Id: </span>
              <ToolNameFieldDisplayer
                toolId={pipelineWizardModel.getData('sfdcToolId')}
                loadToolInNewWindow={true}
              />
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <div>
              <span className="text-muted">SFDC Dest Tool Id: </span>
              <ToolNameFieldDisplayer
                toolId={pipelineWizardModel.getData('sfdcDestToolId')}
                loadToolInNewWindow={true}
              />
            </div>
          </Col>
        </> 
      : 
      <>
        <Col>
          <div>
            <span className="text-muted">Git Tool Id: </span>
            <ToolNameFieldDisplayer
              toolId={pipelineWizardModel.getData('gitToolId')}
              loadToolInNewWindow={true}
            />
          </div>
        </Col>
        {pipelineWizardModel.getData('service') === 'bitbucket' && (
          <Col>
            <div>
              <span className="text-muted">Workspace: </span>
              {pipelineWizardModel.getData('workspace')}
            </div>
          </Col>
        )}
        <Col>
          <div><span className="text-muted">Repository: </span>{pipelineWizardModel.getData('repository')}</div>
        </Col>
        <Col>
          <div><span className="text-muted">Branch: </span>{pipelineWizardModel.getData('gitBranch')}</div>
        </Col>
      </>
    }
  </Row>
);

SfdcPipelineWizardBasicSummary.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SfdcPipelineWizardBasicSummary;