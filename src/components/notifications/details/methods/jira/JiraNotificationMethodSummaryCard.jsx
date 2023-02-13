import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import JiraPriorityField from "components/common/fields/inventory/tools/jira/JiraPriorityField";
import JiraToolProjectField from "components/common/fields/inventory/tools/jira/JiraToolProjectField";

function JiraNotificationMethodSummaryCard({ notificationData, notificationMethodData }) {
  return (
    <JiraToolProjectField
      jiraToolId={notificationMethodData.getData("jiraToolId")}
      dataObject={notificationMethodData}
      fieldName={"toolProjectId"}
      title={"Notification Method: Jira"}
      showUsersFields={true}
    >
      <Col lg={6}>
        <JiraPriorityField dataObject={notificationMethodData} fieldName={"jiraPriority"} jiraToolId={notificationMethodData.getData("jiraToolId")} />
      </Col>
    </JiraToolProjectField>
  );
}

JiraNotificationMethodSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationMethodData: PropTypes.object,
};

export default JiraNotificationMethodSummaryCard;
