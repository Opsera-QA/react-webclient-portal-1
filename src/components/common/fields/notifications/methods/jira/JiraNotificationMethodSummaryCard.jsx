import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import JiraPriorityField from "components/common/fields/inventory/tools/jira/JiraPriorityField";
import JiraToolProjectField from "components/common/fields/inventory/tools/jira/JiraToolProjectField";
import NotificationMethodSummaryCardContainer
  from "components/common/fields/notifications/methods/NotificationMethodSummaryCardContainer";

export default function JiraNotificationMethodSummaryCard({ jiraNotificationModel }) {
  return (
    <NotificationMethodSummaryCardContainer
      method={"Jira"}
    >
      <JiraToolProjectField
        jiraToolId={jiraNotificationModel?.getData("jiraToolId")}
        dataObject={jiraNotificationModel}
        fieldName={"toolProjectId"}
        title={"Notification Method: Jira"}
        showUsersFields={true}
      >
        <Col lg={6}>
          <JiraPriorityField dataObject={jiraNotificationModel} fieldName={"jiraPriority"} jiraToolId={jiraNotificationModel?.getData("jiraToolId")} />
        </Col>
      </JiraToolProjectField>
    </NotificationMethodSummaryCardContainer>
  );
}

JiraNotificationMethodSummaryCard.propTypes = {
  jiraNotificationModel: PropTypes.object,
};
