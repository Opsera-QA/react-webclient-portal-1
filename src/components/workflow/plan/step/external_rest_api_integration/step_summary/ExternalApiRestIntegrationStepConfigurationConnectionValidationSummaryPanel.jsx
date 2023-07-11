import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import BooleanField from "components/common/fields/boolean/BooleanField";
import EndpointField from "components/common/fields/inventory/tools/endpoints/EndpointField";
import JsonField from "components/common/fields/json/JsonField";
import EndpointResponseEvaluationRulesField
from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesField";
import Row from "react-bootstrap/Row";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function ExternalApiRestIntegrationStepConfigurationConnectionValidationSummaryPanel(
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
          subheaderText={"Connection Validation API Request Configuration"}
        />
        <Row>
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
        </Row>
      </div>
      <div className={"mx-3 mt-2"}>
        <H5FieldSubHeader
          subheaderText={"Connection Validation Response Evaluation Rules"}
          className={"mb-3"}
        />
        <Row>
          <Col xs={12}>
            <EndpointResponseEvaluationRulesField
              model={externalRestApiIntegrationModel}
              fieldName={"connectionCheckResponseEvaluationRules"}
              successRuleType={"Successful Connection validation"}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

ExternalApiRestIntegrationStepConfigurationConnectionValidationSummaryPanel.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
};