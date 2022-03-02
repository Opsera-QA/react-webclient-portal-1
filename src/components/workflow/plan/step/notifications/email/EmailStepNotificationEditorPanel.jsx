import React from "react";
import PropTypes from "prop-types";
import NotificationLevelInput from "components/workflow/plan/step/notifications/NotificationLevelInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import EmailNotificationToggle
  from "components/workflow/plan/step/notifications/email/EmailNotificationToggle";

function EmailStepNotificationEditorPanel(
  {
    emailNotificationModel,
    setEmailNotificationModel,
  }) {
  if (emailNotificationModel == null) {
    return null;
  }

  // TODO: Remove after updating the panel to use side tabs
  if (emailNotificationModel.getData("enabled") === false) {
    return (
      <div className="my-4">
        <EmailNotificationToggle
          model={emailNotificationModel}
          setModel={setEmailNotificationModel}
        />
      </div>
    );
  }

  return (
    <div className="my-4">
      <EmailNotificationToggle
        model={emailNotificationModel}
        setModel={setEmailNotificationModel}
      />
      <MultiTextInputBase
        dataObject={emailNotificationModel}
        setDataObject={setEmailNotificationModel}
        fieldName={"addresses"}
      />
      <NotificationLevelInput
        dataObject={emailNotificationModel}
        setDataObject={setEmailNotificationModel}
        fieldName={"event"}
      />
    </div>
  );
}

EmailStepNotificationEditorPanel.propTypes = {
  emailNotificationModel: PropTypes.object,
  setEmailNotificationModel: PropTypes.func,
};

export default EmailStepNotificationEditorPanel;