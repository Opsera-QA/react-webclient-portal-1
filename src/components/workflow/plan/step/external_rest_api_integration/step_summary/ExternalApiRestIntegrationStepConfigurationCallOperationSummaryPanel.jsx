import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import EndpointField from "components/common/fields/inventory/tools/endpoints/EndpointField";
import JsonField from "components/common/fields/json/JsonField";
import EndpointResponseEvaluationRulesField
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesField";
import Row from "react-bootstrap/Row";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function ExternalApiRestIntegrationStepConfigurationCallOperationSummaryPanel(
  {
    externalRestApiIntegrationModel,
  }) {
  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <>
      <div className={"mx-3 mt-2"}>
        <H5FieldSubHeader
          subheaderText={"Call Operation API Request Configuration"}
        />
        <Row>
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
        </Row>
      </div>
      <div className={"mx-3 mt-2"}>
        <H5FieldSubHeader
          subheaderText={"Call Operation Response Evaluation Rules"}
          className={"mb-3"}
        />
        <Row>
          <Col xs={12}>
            <EndpointResponseEvaluationRulesField
              model={externalRestApiIntegrationModel}
              fieldName={"runEndpointResponseEvaluationRules"}
              successRuleType={"Successful Call Operation"}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

ExternalApiRestIntegrationStepConfigurationCallOperationSummaryPanel.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
};