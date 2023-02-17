import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import NotificationTypeField from "components/common/list_of_values_input/notifications/type/NotificationTypeField";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import NotificationsField from "components/common/fields/notifications/NotificationsField";

function NotificationPolicySummaryPanelBase({ notificationData, setActiveTab, notificationTypeSummaryCard }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase
            dataObject={notificationData}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <NotificationTypeField
            model={notificationData}
            fieldName={"type"}
          />
        </Col>
        <Col lg={6}>
          <SsoUserField
            model={notificationData}
            fieldName={"owner"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={notificationData}
          />
        </Col>
        <Col lg={12}>
          <TextFieldBase
            dataObject={notificationData}
            fieldName={"description"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase
            dataObject={notificationData}
            fieldName={"createdAt"}
          />
        </Col>
        <Col lg={12}>
          <TagField
            dataObject={notificationData}
            fieldName={"tags"}
          />
        </Col>
        <Col lg={12}>
          {notificationTypeSummaryCard}
        </Col>
        <Col lg={12}>
          <NotificationsField
            fieldName={"notifications"}
            model={notificationData}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

NotificationPolicySummaryPanelBase.propTypes = {
  notificationData: PropTypes.object,
  setActiveTab: PropTypes.func,
  notificationTypeSummaryCard: PropTypes.object,
};

export default NotificationPolicySummaryPanelBase;
