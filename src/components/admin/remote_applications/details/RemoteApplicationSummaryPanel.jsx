import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import DateTimeField from "components/common/fields/date/DateTimeField";
import JsonField from "components/common/fields/json/JsonField";
import BooleanField from "../../../common/fields/boolean/BooleanField";

function RemoteApplicationSummaryPanel({ telemetryData }) {
  if (telemetryData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"email"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"firstName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"lastName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"companyName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"currentAppVersion"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"totalScans"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={telemetryData} fieldName={"totalRepositoryScanned"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={telemetryData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={telemetryData} fieldName={"enableMetadataSharing"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={telemetryData} fieldName={"active"} />
        </Col>
        <Col lg={6}>
          <JsonField
              dataObject={telemetryData}
              fieldName={"platformsScanned"}
              label={"Platforms Scanned"}
              collapsed={true}
          />
        </Col>
        <Col lg={6}>
          <JsonField
            dataObject={telemetryData}
            fieldName={"scanSummary"}
            label={"Scan Summary"}
            collapsed={true}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

RemoteApplicationSummaryPanel.propTypes = {
  telemetryData: PropTypes.object,
};

export default RemoteApplicationSummaryPanel;
