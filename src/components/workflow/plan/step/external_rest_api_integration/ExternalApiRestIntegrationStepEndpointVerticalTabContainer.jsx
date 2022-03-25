import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExternalApiIntegrationStepRunEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepRunEndpointSelectInput";
import ExternalApiIntegrationStepRunEndpointRequestInputBase
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegrationStepRunEndpointRequestInputBase";
import EndpointResponseEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInputBase";
import ExternalApiIntegrationStepStatusEndpointSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepStatusEndpointSelectInput";
import InfoContainer from "components/common/containers/InfoContainer";

function ExternalApiRestIntegrationStepEndpointVerticalTabContainer(
  {
    externalRestApiIntegrationModel,
    setExternalRestApiIntegrationModel,
  }) {
  const [activeTab, setActiveTab] = useState("run");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer
        className={"h-100 w-100"}
      >
        <div className={"tab-tree"}>
          <VanitySetVerticalTab
            tabText={"Run"}
            tabName={"run"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Status"}
            tabName={"status"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    if (activeTab === "run") {
      return (
        <>
          <ExternalApiIntegrationStepRunEndpointSelectInput
            fieldName={"runEndpointId"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
          />
          <ExternalApiIntegrationStepRunEndpointRequestInputBase
            fieldName={"runEndpointRequestParameters"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
          />
          <EndpointResponseEvaluationRulesInputBase
            fieldName={"runEndpointResponseEvaluationRules"}
            model={externalRestApiIntegrationModel}
            setModel={setExternalRestApiIntegrationModel}
            toolId={externalRestApiIntegrationModel?.getData("toolId")}
            endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
          />
        </>
      );
    }

    return (
      <>
        <ExternalApiIntegrationStepStatusEndpointSelectInput
          fieldName={"statusEndpointId"}
          model={externalRestApiIntegrationModel}
          setModel={setExternalRestApiIntegrationModel}
        />
        <ExternalApiIntegrationStepRunEndpointRequestInputBase
          fieldName={"statusEndpointRequestParameters"}
          model={externalRestApiIntegrationModel}
          setModel={setExternalRestApiIntegrationModel}
          toolId={externalRestApiIntegrationModel?.getData("toolId")}
          endpointId={externalRestApiIntegrationModel?.getData("statusEndpointId")}
        />
        <EndpointResponseEvaluationRulesInputBase
          fieldName={"statusEndpointResponseEvaluationRules"}
          model={externalRestApiIntegrationModel}
          setModel={setExternalRestApiIntegrationModel}
          toolId={externalRestApiIntegrationModel?.getData("toolId")}
          endpointId={externalRestApiIntegrationModel?.getData("runEndpointId")}
        />
      </>
    );
  };

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  return (
    <InfoContainer
      titleText={`Endpoint Configuration`}
    >
      <Row className={"mx-0"}>
        <Col sm={1} className={"px-0"}>
          {getVerticalTabContainer()}
        </Col>
        <Col sm={11} className={"px-0"}>
          <div className={"m-3"}>
            {getCurrentView()}
          </div>
        </Col>
      </Row>
    </InfoContainer>
  );
}

ExternalApiRestIntegrationStepEndpointVerticalTabContainer.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
  setExternalRestApiIntegrationModel: PropTypes.func,
};

export default ExternalApiRestIntegrationStepEndpointVerticalTabContainer;