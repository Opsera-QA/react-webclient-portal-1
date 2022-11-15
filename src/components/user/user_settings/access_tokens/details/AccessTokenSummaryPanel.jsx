import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import DateTimeField from "components/common/fields/date/DateTimeField";
import CountdownUntilDateField from "components/common/fields/date/countdown/CountdownUntilDateField";

export default function AccessTokenSummaryPanel({ accessToken }) {
  if (accessToken == null) {
    return null;
  }

  return (
    <SummaryPanelContainer className={"m-2"}>
      <Row>
        <Col lg={6} md={12}>
          <TextFieldBase dataObject={accessToken} fieldName={"name"} />
        </Col>
        <Col lg={6} md={12}>
          <TextFieldBase dataObject={accessToken} fieldName={"scope"} />
        </Col>
        <Col lg={6} md={12}>
          <DateTimeField dataObject={accessToken} fieldName={"createdAt"} />
        </Col>
        <Col md={12}>
          <CountdownUntilDateField
            model={accessToken}
            fieldName={"expiration"}
            includeDate={true}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

AccessTokenSummaryPanel.propTypes = {
  accessToken: PropTypes.object,
};
