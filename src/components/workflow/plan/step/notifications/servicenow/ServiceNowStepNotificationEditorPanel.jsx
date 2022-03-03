import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationBooleanToggle from "components/workflow/plan/step/notifications/PipelineStepNotificationBooleanToggle";
import PipelineStepNotificationLevelSelectInput from "components/workflow/plan/step/notifications/PipelineStepNotificationLevelSelectInput";
import ServiceNowStepNotificationToolSelectInput
  from "components/workflow/plan/step/notifications/servicenow/ServiceNowStepNotificationToolSelectInput";
import ServiceNowGroupSelectInput
  from "components/common/list_of_values_input/tools/service_now/groups/ServiceNowGroupSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ServiceNowStepNotificationEditorPanel(
  {
    serviceNowNotificationModel,
    setServiceNowNotificationModel,
  }) {
  
  if (serviceNowNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <PipelineStepNotificationBooleanToggle
          model={serviceNowNotificationModel}
          setModel={setServiceNowNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"ServiceNow"}/>
      </Col>
      <Col xs={12}>
        <PipelineStepNotificationLevelSelectInput
          model={serviceNowNotificationModel}
          setModel={setServiceNowNotificationModel}
        />
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
    </Row>
  );
}

ServiceNowStepNotificationEditorPanel.propTypes = {
  serviceNowNotificationModel: PropTypes.object,
  setServiceNowNotificationModel: PropTypes.func,
};

export default ServiceNowStepNotificationEditorPanel;