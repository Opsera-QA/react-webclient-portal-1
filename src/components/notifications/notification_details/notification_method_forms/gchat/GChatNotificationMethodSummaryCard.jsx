import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NotificationMethodSummaryCardContainer
  from "components/notifications/notification_details/notification_method_forms/NotificationMethodSummaryCardContainer";

function GChatNotificationMethodSummaryCard({ notificationData, notificationMethodData }) {
  return (
    <NotificationMethodSummaryCardContainer notificationData={notificationData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"channel"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationMethodData} fieldName={"toolId"} />
        </Col>
      </Row>
    </NotificationMethodSummaryCardContainer>
  );
}

GChatNotificationMethodSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationMethodData: PropTypes.object
};

export default GChatNotificationMethodSummaryCard;
