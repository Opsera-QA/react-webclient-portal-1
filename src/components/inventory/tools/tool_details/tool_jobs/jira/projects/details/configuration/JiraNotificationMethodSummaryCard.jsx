import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NotificationMethodSummaryCardContainer
  from "components/notifications/notification_details/notification_method_forms/NotificationMethodSummaryCardContainer";

function JiraNotificationMethodSummaryCard({ notificationData, notificationMethodData }) {
  return (
    <NotificationMethodSummaryCardContainer notificationData={notificationData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraToolId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraProject"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraBoard"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraSprint"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraParentTicket"} />
        </Col>
      </Row>
    </NotificationMethodSummaryCardContainer>
  );
}

JiraNotificationMethodSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationMethodData: PropTypes.object,
}

export default JiraNotificationMethodSummaryCard;
