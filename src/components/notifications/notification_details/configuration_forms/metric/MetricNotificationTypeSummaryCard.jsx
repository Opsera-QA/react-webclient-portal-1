import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import NotificationTypeSummaryCardContainer from "components/notifications/notification_details/configuration_forms/NotificationTypeSummaryCardContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function MetricNotificationTypeSummaryCard({ notificationData, notificationConfigurationData, isLoading }) {
  if (isLoading) {
    return <NotificationTypeSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <NotificationTypeSummaryCardContainer notificationData={notificationData} isLoading={isLoading}>
      <Row>
        {/*TODO: Write way to pull image and more KPI details*/}
        <Col lg={6}>
          <TextFieldBase dataObject={notificationConfigurationData} fieldName={"kpi_identifier"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationConfigurationData} fieldName={"dataPoint"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationConfigurationData} fieldName={"conditionIf"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationConfigurationData} fieldName={"condition"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={notificationConfigurationData} fieldName={"threshold"} />
        </Col>
      </Row>
    </NotificationTypeSummaryCardContainer>
  );
}

MetricNotificationTypeSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default MetricNotificationTypeSummaryCard;
