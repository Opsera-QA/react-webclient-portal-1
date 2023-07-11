import React from "react";
import PropTypes from "prop-types";
import OrchestrationNotificationLevelSelectInput
from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import EmailNotificationToggle
from "components/workflow/plan/step/notifications/email/EmailNotificationToggle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MultiEmailListInput from "components/common/inputs/list/text/email/MultiEmailListInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function EmailNotificationEditorPanel(
  {
    emailNotificationModel,
    setEmailNotificationModel,
    showOrchestrationFields,
  }) {
  const getOrchestrationFields = () => {
    if (showOrchestrationFields !== false) {
      return (
        <>
          <Col xs={12}>
            <OrchestrationNotificationLevelSelectInput
              model={emailNotificationModel}
              setModel={setEmailNotificationModel}
            />
          </Col>
          <Col xs={12}>
            <BooleanToggleInput
              dataObject={emailNotificationModel}
              setDataObject={setEmailNotificationModel}
              disabled={emailNotificationModel?.getData("enabled") === false}
              fieldName={"logEnabled"}
            />
          </Col>
        </>
      );
    }
  };

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
      {getOrchestrationFields()}
    </Row>
  );
}

EmailNotificationEditorPanel.propTypes = {
  emailNotificationModel: PropTypes.object,
  setEmailNotificationModel: PropTypes.func,
  showOrchestrationFields: PropTypes.bool,
};

export default EmailNotificationEditorPanel;