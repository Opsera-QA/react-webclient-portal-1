import React from 'react';
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import SfdcPipelineWizardStepUnitTestList
  from "components/workflow/wizards/sfdc_pipeline_wizard/xml_viewer/SfdcPipelineWizardStepUnitTestList";

const UnitTestClassesViewer = ({pipelineWizardModel}) => {
  const getUnitTestSteps = () => {
    if (Array.isArray(pipelineWizardModel.getArrayData("unitTestSteps")) && pipelineWizardModel.getArrayData("unitTestSteps").length > 0) {
      return pipelineWizardModel.getArrayData("unitTestSteps").map((step, idx) => {
        return (
          <Col key={idx} sm={12} md={6} lg={4} className={"m-2 w-100"}>
            <SfdcPipelineWizardStepUnitTestList
              pipelineWizardModel={pipelineWizardModel}
              unitTestStep={step}
            />
          </Col>
        );
      });
    }
  };

  return (
    <div className="flex-container-content mt-4">
      <div className="h5">SalesForce Pipeline Run: Unit Test Classes</div>
      <div>
        <Row className={"w-100"}>
          {getUnitTestSteps()}
        </Row>
      </div>
    </div>
  );
};

UnitTestClassesViewer.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default UnitTestClassesViewer;