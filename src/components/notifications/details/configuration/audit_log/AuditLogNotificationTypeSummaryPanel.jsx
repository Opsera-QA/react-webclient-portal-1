import React from "react";
import PropTypes from "prop-types";
import AuditLogNotificationTargetField
  from "components/notifications/details/configuration/audit_log/fields/AuditLogNotificationTargetField";
import { Row, Col } from "react-bootstrap";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import AuditLogActionListField from "temp-library-components/fields/audit_logs/AuditLogActionListField";

export default function AuditLogNotificationTypeSummaryPanel(
  {
    notificationData,
    notificationConfigurationData,
    isLoading,
  }) {
  if (isLoading) {
    return null;
  }

  return (
    <div className={"mt-3"}>
      <H5FieldSubHeader
        icon={faEnvelope}
        subheaderText={"Audit Log Notification Configuration"}
      />
      <Row>
        <Col lg={12} xl={6}>
          <AuditLogNotificationTargetField
            model={notificationData}
          />
        </Col>
        <Col lg={12} xl={6}>
          <AuditLogActionListField
            model={notificationConfigurationData}
            fieldName={"events"}
            customTitle={"Notify For These Events"}
            className={"my-2"}
          />
        </Col>
      </Row>
    </div>
  );
}

AuditLogNotificationTypeSummaryPanel.propTypes = {
  notificationData: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};
