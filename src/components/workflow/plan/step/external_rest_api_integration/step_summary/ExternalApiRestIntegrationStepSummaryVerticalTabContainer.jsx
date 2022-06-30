import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";
import { Col } from "react-bootstrap";
import BooleanField from "components/common/fields/boolean/BooleanField";
import EndpointField from "components/common/fields/inventory/tools/endpoints/EndpointField";
import JsonField from "components/common/fields/json/JsonField";
import EndpointResponseEvaluationRulesField
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesField";
import Row from "react-bootstrap/Row";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

const EXTERNAL_API_REST_INTEGRATION_TABS = {
  CONNECTION_VALIDATION_CONFIGURATION: "connection-validation-configuration",
  CALL_OPERATION_CONFIGURATION: "call-operation-configuration",
  STATUS_CHECK_CONFIGURATION: "status-check-configuration",
};

function ExternalApiRestIntegrationStepSummaryVerticalTabContainer(
  {
    externalRestApiIntegrationModel,
  }) {
  const [activeTab, setActiveTab] = useState(EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_VALIDATION_CONFIGURATION);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <div className={"tab-tree scroll-y"}>
          <VanitySetVerticalTab
            tabText={"Connection Validation"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_VALIDATION_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tooltipText={"This is the an optional prerequisite operation that validates the connectivity of the external tool before making the call operation request."}
          />
          <VanitySetVerticalTab
            tabText={"Call Operation"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CALL_OPERATION_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tooltipText={"This is the actual calling of the API with all of the configured settings."}
          />
          <VanitySetVerticalTab
            tabText={"Status Check"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tooltipText={`
              This status check can be called multiple times depending on how long it takes the API to complete its task. 
              The status check will return either running, successful or failed based on the configured Evaluation Rules.
            `}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  // TODO: These views should probably be separate components
  const getCurrentView = () => {
    switch (activeTab) {
      case EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_VALIDATION_CONFIGURATION:
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
      case EXTERNAL_API_REST_INTEGRATION_TABS.CALL_OPERATION_CONFIGURATION:
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
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_CONFIGURATION:
        return (
          <>
            <div className={"mx-3 mt-2"}>
              <H5FieldSubHeader
                subheaderText={"Status Check API Request Configuration"}
              />
              <Row>
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
              </Row>
            </div>
            <div className={"mx-3 mt-2"}>
              <Row>
                <Col xs={12}>
                  <EndpointResponseEvaluationRulesField
                    model={externalRestApiIntegrationModel}
                    fieldName={"statusEndpointResponseEvaluationRules"}
                    successRuleType={"Successful Completion"}
                    inProgressRuleType={"In Progress"}
                  />
                </Col>
              </Row>
            </div>
          </>
        );
    }
  };

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <VanitySetTabAndViewContainer
      title={`API Request Configuration`}
      verticalTabContainer={getVerticalTabContainer()}
      tabColumnSize={3}
      currentView={
        <div style={{overflowX: "hidden", minHeight: EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}}>
          {getCurrentView()}
        </div>
      }
      minimumHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}
      maximumHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.EXTERNAL_API_INTEGRATION_STEP_ENDPOINT_VERTICAL_TAB_CONTAINER_HEIGHT}
      defaultActiveKey={activeTab}
    />
  );
}

ExternalApiRestIntegrationStepSummaryVerticalTabContainer.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
};

export default ExternalApiRestIntegrationStepSummaryVerticalTabContainer;