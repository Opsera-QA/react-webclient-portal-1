import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
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

const EXTERNAL_API_REST_INTEGRATION_TABS = {
  CONNECTION_CHECK_API_CONFIGURATION: "connection-check-api-configuration",
  CONNECTION_CHECK_EVALUATION_RULES_CONFIGURATION: "connection-check-evaluation-rules-configuration",
  RUN_TRIGGER_API_CONFIGURATION: "run-trigger-api-configuration",
  RUN_TRIGGER_EVALUATION_RULES_CONFIGURATION: "run-trigger-evaluation-rules-configuration",
  STATUS_CHECK_API_CONFIGURATION: "status-check-api-configuration",
  STATUS_CHECK_EVALUATION_RULES_CONFIGURATION: "status-check-evaluation-rules-configuration",
};

function ExternalApiRestIntegrationStepSummaryVerticalTabContainer(
  {
    externalRestApiIntegrationModel,
  }) {
  const [activeTab, setActiveTab] = useState(EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_API_CONFIGURATION);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <div className={"tab-tree scroll-y"}>
          <H5FieldSubHeader
            subheaderText={"Connection Check"}
            className={"mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"API Configuration"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_API_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <H5FieldSubHeader
            subheaderText={"Run Trigger"}
            className={"mt-4 mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"API Configuration"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_API_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <H5FieldSubHeader
            subheaderText={"Status Check"}
            className={"mt-4 mb-3"}
          />
          <VanitySetVerticalTab
            tabText={"API Configuration"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_API_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Evaluation Rules"}
            tabName={EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_EVALUATION_RULES_CONFIGURATION}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_API_CONFIGURATION:
        return (
          <div className={"mx-3 mt-2"}>
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
        );

      case EXTERNAL_API_REST_INTEGRATION_TABS.CONNECTION_CHECK_EVALUATION_RULES_CONFIGURATION:
        return (
          <div className={"mx-3 mt-2"}>
            <Row>
              <Col xs={12}>
                <EndpointResponseEvaluationRulesField
                  model={externalRestApiIntegrationModel}
                  fieldName={"connectionCheckResponseEvaluationRules"}
                  successRuleType={"Successful Connection Check"}
                />
              </Col>
            </Row>
          </div>
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_API_CONFIGURATION:
        return (
          <div className={"mx-3 mt-2"}>
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
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.RUN_TRIGGER_EVALUATION_RULES_CONFIGURATION:
        return (
          <div className={"mx-3 mt-2"}>
            <Row>
              <Col xs={12}>
                <EndpointResponseEvaluationRulesField
                  model={externalRestApiIntegrationModel}
                  fieldName={"runEndpointResponseEvaluationRules"}
                  successRuleType={"Successful Run Trigger"}
                />
              </Col>
            </Row>
          </div>
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_API_CONFIGURATION:
        return (
          <div className={"mx-3 mt-2"}>
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
        );
      case EXTERNAL_API_REST_INTEGRATION_TABS.STATUS_CHECK_EVALUATION_RULES_CONFIGURATION:
        return (
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
        );
    }
  };

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <VanitySetTabAndViewContainer
      title={`Endpoint Configuration`}
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