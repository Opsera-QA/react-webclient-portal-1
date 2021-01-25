import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function SiteNotificationSummaryPanel({ siteNotificationData, setActiveTab }) {
  if (siteNotificationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          {/*TODO: Make type field that pretty prints it*/}
          <TextFieldBase dataObject={siteNotificationData} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={siteNotificationData} fieldName={"header"}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Make view field that pretty prints it*/}
          <TextFieldBase dataObject={siteNotificationData} fieldName={"view"}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Make FQDN Link Displayer*/}
          <TextFieldBase dataObject={siteNotificationData} fieldName={"link"}/>
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={siteNotificationData} fieldName={"displayOnDate"}/>
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={siteNotificationData} fieldName={"expiration"}/>
        </Col>
        <Col lg={12}>
          {/*TODO: Make field to display what it will look like*/}
          <TextFieldBase dataObject={siteNotificationData} fieldName={"message"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SiteNotificationSummaryPanel.propTypes = {
  siteNotificationData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SiteNotificationSummaryPanel;
