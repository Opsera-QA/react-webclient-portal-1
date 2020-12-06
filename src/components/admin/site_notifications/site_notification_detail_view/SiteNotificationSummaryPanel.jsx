import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function SiteNotificationSummaryPanel({ siteNotificationData, setActiveTab }) {
  if (siteNotificationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={siteNotificationData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <DtoToggleField dataObject={siteNotificationData} fieldName={"active"}/>
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
