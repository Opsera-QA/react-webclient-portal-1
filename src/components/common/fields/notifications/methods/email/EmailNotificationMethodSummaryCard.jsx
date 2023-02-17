import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NotificationMethodSummaryCardContainer
  from "components/common/fields/notifications/methods/NotificationMethodSummaryCardContainer";
import EmailAddressArrayField from "components/common/fields/multiple_items/email/EmailAddressArrayField";

export default function EmailNotificationMethodSummaryCard(
  {
    emailNotificationModel,
  }) {
  return (
    <NotificationMethodSummaryCardContainer
      notificationData={"Email"}
    >
      <Row>
        <Col lg={12}>
          <EmailAddressArrayField
            fieldName={"addresses"}
            model={emailNotificationModel}
          />
        </Col>
      </Row>
    </NotificationMethodSummaryCardContainer>
  );
}

EmailNotificationMethodSummaryCard.propTypes = {
  emailNotificationModel: PropTypes.object,
};
