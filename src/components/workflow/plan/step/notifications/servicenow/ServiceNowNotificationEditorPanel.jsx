import React from "react";
import PropTypes from "prop-types";
import EnabledNotificationBooleanToggle from "components/workflow/plan/step/notifications/EnabledNotificationBooleanToggle";
import OrchestrationNotificationLevelSelectInput from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import ServiceNowStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowStepNotificationToolSelectInput";
import ServiceNowGroupSelectInput
  from "components/common/list_of_values_input/tools/service_now/groups/ServiceNowGroupSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ServiceNowNotificationEditorPanel(
  {
    serviceNowNotificationModel,
    setServiceNowNotificationModel,
    showOrchestrationFields,
  }) {
  const getOrchestrationFields = () => {
    if (showOrchestrationFields !== false) {
      return (
        <>
          <Col xs={12}>
            <OrchestrationNotificationLevelSelectInput
              model={serviceNowNotificationModel}
              setModel={setServiceNowNotificationModel}
            />
          </Col>
        </>
      );
    }
  };
  
  if (serviceNowNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <EnabledNotificationBooleanToggle
          model={serviceNowNotificationModel}
          setModel={setServiceNowNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"ServiceNow"}/>
      </Col>
      <Col xs={12}>
        <ServiceNowStepNotificationToolSelectInput
          model={serviceNowNotificationModel}
          setModel={setServiceNowNotificationModel}
        />
      </Col>
      {/*<Col xs={12}>*/}
      {/*<ServiceNowUserSelectInput*/}
      {/*  fieldName={"serviceNowUserId"}*/}
      {/*  serviceNowId={serviceNowNotificationModel?.getData("toolId")}*/}
      {/*  model={serviceNowNotificationModel}*/}
      {/*  setModel={setServiceNowNotificationModel}*/}
      {/*/>*/}
      {/*</Col>*/}
      <Col xs={12}>
        <ServiceNowGroupSelectInput
          fieldName={"serviceNowGroupId"}
          serviceNowId={serviceNowNotificationModel?.getData("toolId")}
          model={serviceNowNotificationModel}
          setModel={setServiceNowNotificationModel}
        />
      </Col>
      {getOrchestrationFields()}
    </Row>
  );
}

ServiceNowNotificationEditorPanel.propTypes = {
  serviceNowNotificationModel: PropTypes.object,
  setServiceNowNotificationModel: PropTypes.func,
  showOrchestrationFields: PropTypes.bool,
};

export default ServiceNowNotificationEditorPanel;