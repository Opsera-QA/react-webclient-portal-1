import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import modelHelpers from "components/common/model/modelHelpers";
import ExternalApiRestIntegrationStepSummaryVerticalTabContainer
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalApiRestIntegrationStepSummaryVerticalTabContainer";

function ExternalRestApiIntegrationStepSummaryPanel({ pipelineData, setActiveTab }) {
  const [externalRestApiIntegrationModel, setExternalRestApiIntegrationModel] = useState(undefined);

  useEffect(() => {
    setExternalRestApiIntegrationModel(undefined);

    if (pipelineData) {
      setExternalRestApiIntegrationModel(modelHelpers.parseObjectIntoModel(pipelineData?.tool?.configuration, externalRestApiIntegrationStepMetadata));
    }
  }, [pipelineData]);

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <PipelineStepSummaryPanelContainer
      setActiveTab={setActiveTab}
      pipelineData={pipelineData}
    >
      <Row>
        <Col lg={12}>
          <ToolNameField
            model={externalRestApiIntegrationModel}
            fieldName={"toolId"}
          />
        </Col>
        <Col lg={12}>
          <ExternalApiRestIntegrationStepSummaryVerticalTabContainer
            externalRestApiIntegrationModel={externalRestApiIntegrationModel}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ExternalRestApiIntegrationStepSummaryPanel.propTypes = {
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ExternalRestApiIntegrationStepSummaryPanel;
