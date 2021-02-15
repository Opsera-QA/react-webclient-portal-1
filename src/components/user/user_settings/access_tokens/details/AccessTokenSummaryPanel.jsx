import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import DateTimeField from "components/common/fields/date/DateTimeField";

function AccessTokenSummaryPanel({ accessToken }) {
  if (accessToken == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={accessToken} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={accessToken} fieldName={"scope"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={accessToken} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={accessToken} fieldName={"expiration"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

AccessTokenSummaryPanel.propTypes = {
  accessToken: PropTypes.object,
};

export default AccessTokenSummaryPanel;
