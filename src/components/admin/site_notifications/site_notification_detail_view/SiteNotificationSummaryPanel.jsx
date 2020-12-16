import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";

function SiteNotificationSummaryPanel({ siteNotificationData, setActiveTab }) {
  if (siteNotificationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          {/*TODO: Make type field that pretty prints it*/}
          <DtoTextField dataObject={siteNotificationData} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={siteNotificationData} fieldName={"header"}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Make view field that pretty prints it*/}
          <DtoTextField dataObject={siteNotificationData} fieldName={"view"}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Make FQDN Link Displayer*/}
          <DtoTextField dataObject={siteNotificationData} fieldName={"link"}/>
        </Col>
        <Col lg={6}>
          {/*TODO: Make DateTime field*/}
          <DtoDateField dataObject={siteNotificationData} fieldName={"expiration"}/>
        </Col>
        <Col lg={12}>
          {/*TODO: Make field to display what it will look like*/}
          <DtoTextField dataObject={siteNotificationData} fieldName={"message"}/>
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
