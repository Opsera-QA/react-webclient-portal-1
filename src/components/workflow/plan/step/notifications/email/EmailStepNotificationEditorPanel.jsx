import React from "react";
import PropTypes from "prop-types";
import OrchestrationNotificationLevelSelectInput from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import EmailNotificationToggle
  from "components/workflow/plan/step/notifications/email/EmailNotificationToggle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MultiEmailListInput from "components/common/inputs/list/text/email/MultiEmailListInput";

function EmailStepNotificationEditorPanel(
  {
    emailNotificationModel,
    setEmailNotificationModel,
  }) {
  if (emailNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <EmailNotificationToggle
          model={emailNotificationModel}
          setModel={setEmailNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <MultiEmailListInput
          model={emailNotificationModel}
          setModel={setEmailNotificationModel}
          fieldName={"addresses"}
          disabled={emailNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12}>
        <OrchestrationNotificationLevelSelectInput
          model={emailNotificationModel}
          setModel={setEmailNotificationModel}
        />
      </Col>
    </Row>
  );
}

EmailStepNotificationEditorPanel.propTypes = {
  emailNotificationModel: PropTypes.object,
  setEmailNotificationModel: PropTypes.func,
};

export default EmailStepNotificationEditorPanel;