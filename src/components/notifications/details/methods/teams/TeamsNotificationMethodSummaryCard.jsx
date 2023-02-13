import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NotificationMethodSummaryCardContainer
  from "components/notifications/details/methods/NotificationMethodSummaryCardContainer";

function TeamsNotificationMethodSummaryCard({ notificationData, notificationMethodData }) {
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

TeamsNotificationMethodSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationMethodData: PropTypes.object
};

export default TeamsNotificationMethodSummaryCard;
