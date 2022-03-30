import React from "react";
import PropTypes from "prop-types";
import PipelineStepNotificationLevelSelectInput from "components/workflow/plan/step/notifications/PipelineStepNotificationLevelSelectInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import EmailNotificationToggle
  from "components/workflow/plan/step/notifications/email/EmailNotificationToggle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <MultiTextInputBase
          dataObject={emailNotificationModel}
          setDataObject={setEmailNotificationModel}
          fieldName={"addresses"}
          disabled={emailNotificationModel?.getData("enabled") === false}
        />
      </Col>
      <Col xs={12}>
        <PipelineStepNotificationLevelSelectInput
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