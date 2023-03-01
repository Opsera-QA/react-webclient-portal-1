import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NotificationMethodSummaryCardContainer
  from "components/common/fields/notifications/methods/NotificationMethodSummaryCardContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

export default function SlackNotificationMethodSummaryCard({ slackNotificationModel }) {
  return (
    <NotificationMethodSummaryCardContainer
      method={"Slack"}
    >
      <Row>
        <Col lg={6}>
          <TextFieldBase
            dataObject={slackNotificationModel}
            fieldName={"channel"}
          />
        </Col>
        <Col lg={6}>
          <ToolNameField
            dataObject={slackNotificationModel}
            fieldName={"toolId"}
          />
        </Col>
      </Row>
    </NotificationMethodSummaryCardContainer>
  );
}

SlackNotificationMethodSummaryCard.propTypes = {
  slackNotificationModel: PropTypes.object,
};
