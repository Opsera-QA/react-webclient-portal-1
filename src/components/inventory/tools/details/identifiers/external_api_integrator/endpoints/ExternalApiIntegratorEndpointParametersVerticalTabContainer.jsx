import React, {useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoContainer from "components/common/containers/InfoContainer";
import {
  ENDPOINT_REQUEST_TYPES
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";
import EndpointRequestBodyInputBase
  from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestBodyInputBase";
import EndpointResponseBodyInputBase
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyInputBase";

function ExternalApiIntegratorEndpointParametersVerticalTabContainer(
  {
    externalApiIntegratorModel,
    setExternalApiIntegratorModel,
  }) {
  const [activeTab, setActiveTab] = useState("requestBody");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getDynamicTabsForRequestType = () => {
    switch (externalApiIntegratorModel?.getData("requestType")) {
      case ENDPOINT_REQUEST_TYPES.GET:
        return (
          <VanitySetVerticalTab
            tabText={"Query Parameter Fields"}
            tabName={"queryParameters"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer
        className={"h-100 w-100"}
      >
        <div className={"tab-tree"}>
          {getDynamicTabsForRequestType()}
          <VanitySetVerticalTab
            tabText={"Request Body Fields"}
            tabName={"requestBody"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Response Body Fields"}
            tabName={"responseBody"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "queryParameters":
        return (
          <EndpointRequestBodyInputBase
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"queryParameterFields"}
          />
        );
      case "requestBody":
        return (
          <EndpointRequestBodyInputBase
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"requestBodyFields"}
          />
        );
      case "responseBody":
        return (
          <EndpointResponseBodyInputBase
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
            fieldName={"responseBodyFields"}
          />
        );
    }
  };

  if (externalApiIntegratorModel == null) {
    return null;
  }

  return (
    <InfoContainer
      titleText={`Endpoint Field Configuration`}
    >
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          {getVerticalTabContainer()}
        </Col>
        <Col sm={10} className={"px-0"}>
          <div className={"m-3"}>
            {getCurrentView()}
          </div>
        </Col>
      </Row>
    </InfoContainer>
  );
}

ExternalApiIntegratorEndpointParametersVerticalTabContainer.propTypes = {
  externalApiIntegratorModel: PropTypes.object,
  setExternalApiIntegratorModel: PropTypes.func,
};

export default ExternalApiIntegratorEndpointParametersVerticalTabContainer;