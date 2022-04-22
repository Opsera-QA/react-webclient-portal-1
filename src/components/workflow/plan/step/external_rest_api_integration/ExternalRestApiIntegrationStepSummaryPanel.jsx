import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import JsonField from "components/common/fields/json/JsonField";
import modelHelpers from "components/common/model/modelHelpers";
import EndpointField from "components/common/fields/inventory/tools/endpoints/EndpointField";
import EndpointResponseEvaluationRulesField
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesField";

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
        <Col lg={6}>
          <BooleanField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"useConnectionCheck"}
          />
        </Col>
        <Col lg={12}>
          <EndpointField
            model={externalRestApiIntegrationModel}
            fieldName={"connectionCheckEndpointId"}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("connectionCheckEndpointId")}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"connectionCheckRequestParameters"}
          />
        </Col>
        <Col xs={12}>
          <EndpointResponseEvaluationRulesField
            model={externalRestApiIntegrationModel}
            fieldName={"connectionCheckResponseEvaluationRules"}
            successRuleType={"Successful Connection Check"}
          />
        </Col>
        <Col lg={12}>
          <EndpointField
            model={externalRestApiIntegrationModel}
            fieldName={"runEndpointId"}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"runEndpointRequestParameters"}
          />
        </Col>
        <Col xs={12}>
          <EndpointResponseEvaluationRulesField
            model={externalRestApiIntegrationModel}
            fieldName={"runEndpointResponseEvaluationRules"}
            successRuleType={"Successful Run Trigger"}
            inProgressRuleType={"In Progress Run Trigger"}
          />
        </Col>
        <Col lg={6}>
          <EndpointField
            model={externalRestApiIntegrationModel}
            fieldName={"statusEndpointId"}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("statusEndpointId")}
          />
        </Col>
        <Col xs={12}>
          <JsonField
            dataObject={externalRestApiIntegrationModel}
            fieldName={"statusEndpointRequestParameters"}
          />
        </Col>
        <Col xs={12}>
          <EndpointResponseEvaluationRulesField
            model={externalRestApiIntegrationModel}
            fieldName={"statusEndpointResponseEvaluationRules"}
            successRuleType={"Successful Completion"}
            inProgressRuleType={"In Progress"}
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
