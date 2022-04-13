import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import JsonField from "components/common/fields/json/JsonField";
import modelHelpers from "components/common/model/modelHelpers";

function ExternalRestApiIntegrationStepSummaryPanel({ pipelineData, setActiveTab }) {
  const [externalRestApiIntegrationModel, setExternalRestApiIntegrationModel] = useState(undefined);

  useEffect(() => {
    setExternalRestApiIntegrationModel(undefined);

    console.log(JSON.stringify(pipelineData?.tool));
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
        <Col lg={6}>
          <BooleanField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"useConnectionCheck"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={externalRestApiIntegrationModel}
            fieldName={"connectionCheckEndpointId"}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"connectionCheckRequestParameters"}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"connectionCheckResponseEvaluationRules"}
          />
        </Col>
        <Col lg={12}>
          <SmartIdField
            model={externalRestApiIntegrationModel}
            fieldName={"runEndpointId"}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"runEndpointRequestParameters"}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"runEndpointResponseEvaluationRules"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={externalRestApiIntegrationModel}
            fieldName={"statusEndpointId"}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"statusEndpointRequestParameters"}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"statusEndpointResponseEvaluationRules"}
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
