import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import EndpointRequestTypeField
  from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/EndpointRequestTypeField";
import InfoContainer from "components/common/containers/InfoContainer";
import DescriptionField from "components/common/fields/text/DescriptionField";
import EndpointTypeField from "components/common/list_of_values_input/inventory/endpoints/type/EndpointTypeField";
import JsonField from "components/common/fields/json/JsonField";

function ExternalApiIntegratorEndpointSummaryCard(
  {
    endpointModel,
    className,
  }) {
  if (endpointModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <InfoContainer
      className={className}
      titleText={endpointModel?.getData("name")}
    >
      <div className={"mx-3"}>
        <Row>
          <Col xs={12}>
            <TextFieldBase
              fieldName={"url"}
              dataObject={endpointModel}
              showClipboardButton={true}
            />
          </Col>
          <Col xs={6}>
            <SmartIdField
              fieldName={"_id"}
              model={endpointModel}
            />
          </Col>
          <Col xs={6}>
            <EndpointTypeField
              fieldName={"type"}
              model={endpointModel}
            />
          </Col>
          <Col xs={6}>
            <EndpointRequestTypeField
              fieldName={"requestType"}
              model={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <JsonField
              fieldName={"headerConfiguration"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={6}>
            <JsonField
              fieldName={"queryParameterFields"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <JsonField
              fieldName={"requestBodyFields"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <JsonField
              fieldName={"responseEvaluationRules"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <TextFieldBase
              fieldName={"responseBodyType"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <JsonField
              fieldName={"responseBodyFields"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <JsonField
              fieldName={"requestParameters"}
              dataObject={endpointModel}
            />
          </Col>
          <Col xs={12}>
            <DescriptionField
              dataObject={endpointModel}
            />
          </Col>
        </Row>
      </div>
    </InfoContainer>
  );
}

ExternalApiIntegratorEndpointSummaryCard.propTypes = {
  endpointModel: PropTypes.object,
  className: PropTypes.string,
};

export default ExternalApiIntegratorEndpointSummaryCard;
