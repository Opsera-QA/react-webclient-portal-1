import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import DateTimeField from "components/common/fields/date/DateTimeField";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import OwnerNameField from "components/common/fields/text/general/OwnerNameField";

function PipelineStorageSummaryPanel({ pipelineStorageData }) {
  if (pipelineStorageData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <SmartIdField model={pipelineStorageData} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineStorageData} fieldName={"dataType"} />
        </Col>
        <Col lg={6}>
          <OwnerNameField model={pipelineStorageData} fieldName={"owner_name"} />
        </Col>
        <Col lg={6}>
          <SmartIdField model={pipelineStorageData} fieldName={"customerId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineStorageData} fieldName={"pipelineName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineStorageData} fieldName={"pipelineId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineStorageData} fieldName={"runCount"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pipelineStorageData} fieldName={"stepId"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={pipelineStorageData} fieldName={"createdAt"} />
        </Col>
        <Col lg={12}>
          <StandaloneJsonField model={pipelineStorageData} fieldName={"data"} label={"Custom Pipeline Storage Data"} collapsed={true} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStorageSummaryPanel.propTypes = {
  pipelineStorageData: PropTypes.object,
};

export default PipelineStorageSummaryPanel;
