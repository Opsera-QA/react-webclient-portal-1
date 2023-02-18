import React from "react";
import PropTypes from "prop-types";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import AuditLogNotificationTargetField
  from "components/notifications/details/configuration/audit_log/fields/AuditLogNotificationTargetField";
import { Row, Col } from "react-bootstrap";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";

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
        <Col xs={12} sm={6}>
          <AuditLogNotificationTargetField
            model={notificationData}
          />
        </Col>
        <Col xs={12} sm={6}>
          <GenericItemField
            dataObject={notificationConfigurationData}
            fieldName={"events"}
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
