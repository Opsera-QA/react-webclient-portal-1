import React from "react";
import PropTypes from "prop-types";
import pipelineNotificationConfigurationMetadata
  from "components/notifications/details/configuration/pipeline/pipeline-notification-configuration-metadata";
import metricNotificationConfigurationMetadata
  from "components/notifications/details/configuration/metric/metric-notification-configuration-metadata";
import MetricNotificationTypeSummaryCard
  from "components/notifications/details/configuration/metric/MetricNotificationTypeSummaryCard";
import PipelineNotificationTypeSummaryCard
  from "components/notifications/details/configuration/pipeline/PipelineNotificationTypeSummaryCard";
import modelHelpers from "components/common/model/modelHelpers";
import AuditLogNotificationTypeSummaryCard
  from "components/notifications/details/configuration/audit_log/AuditLogNotificationTypeSummaryCard";
import {
  auditLogNotificationConfigurationMetadata
} from "components/notifications/details/configuration/audit_log/auditLogNotificationConfigurationMetadata";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import NotificationTypeField from "components/common/list_of_values_input/notifications/type/NotificationTypeField";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import NotificationsField from "components/common/fields/notifications/NotificationsField";

function NotificationPolicySummaryPanel({ notificationData, setActiveTab }) {
  const getNotificationTypeSummaryPanel = () => {
    switch (notificationData.getData("type")) {
      case "audit_log":
        return (
          <AuditLogNotificationTypeSummaryCard
            notificationConfigurationData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), auditLogNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      case "metric":
        return (
          <MetricNotificationTypeSummaryCard
            notificationConfigurationData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), metricNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      case "pipeline":
        return (
          <PipelineNotificationTypeSummaryCard
            notificationConfigurationData={modelHelpers.parseObjectIntoModel(notificationData.getData("configuration"), pipelineNotificationConfigurationMetadata)}
            notificationData={notificationData}
          />
        );
      default:
        return (<div>No notification type associated with this Notification</div>);
    }
  };

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase
            dataObject={notificationData}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <NotificationTypeField
            model={notificationData}
            fieldName={"type"}
          />
        </Col>
        <Col lg={6}>
          <SsoUserField
            model={notificationData}
            fieldName={"owner"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={notificationData}
          />
        </Col>
        <Col lg={12}>
          <TextFieldBase
            dataObject={notificationData}
            fieldName={"description"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase
            dataObject={notificationData}
            fieldName={"createdAt"}
          />
        </Col>
        <Col lg={12}>
          <TagField
            dataObject={notificationData}
            fieldName={"tags"}
          />
        </Col>
        <Col lg={12}>
          {getNotificationTypeSummaryPanel()}
        </Col>
        <Col lg={12}>
          <NotificationsField
            fieldName={"notifications"}
            model={notificationData}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


NotificationPolicySummaryPanel.propTypes = {
  notificationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default NotificationPolicySummaryPanel;
