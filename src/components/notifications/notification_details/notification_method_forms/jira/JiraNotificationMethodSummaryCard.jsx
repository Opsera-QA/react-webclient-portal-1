import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import DtoItemField from "components/common/form_fields/dto_form_fields/dto-item-field";
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
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraPriority"} />
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
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraOpenStep"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraClosureStep"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"jiraPrimaryAssignee"} />
        </Col>
        <Col lg={12}>
          <DtoItemField dataObject={notificationMethodData} fieldName={"jiraSecondaryAssignees"} />
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
