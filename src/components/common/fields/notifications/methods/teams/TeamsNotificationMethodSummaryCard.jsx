import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NotificationMethodSummaryCardContainer
  from "components/common/fields/notifications/methods/NotificationMethodSummaryCardContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

export default function TeamsNotificationMethodSummaryCard({ teamsNotificationModel }) {
  return (
    <NotificationMethodSummaryCardContainer
      method={"Microsoft Teams"}
    >
      <Row>
        <Col lg={6}>
          <TextFieldBase
            dataObject={teamsNotificationModel}
            fieldName={"channel"}
          />
        </Col>
        <Col lg={6}>
          <ToolNameField
            dataObject={teamsNotificationModel}
            fieldName={"toolId"}
          />
        </Col>
      </Row>
    </NotificationMethodSummaryCardContainer>
  );
}

TeamsNotificationMethodSummaryCard.propTypes = {
  teamsNotificationModel: PropTypes.object,
};
