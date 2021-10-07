import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function PipelineStepServiceNowNotificationSummaryPanel({ serviceNowNotificationModel }) {
  if (serviceNowNotificationModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={serviceNowNotificationModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={serviceNowNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={serviceNowNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"serviceNowUserId"} dataObject={serviceNowNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"serviceNowGroupId"} dataObject={serviceNowNotificationModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStepServiceNowNotificationSummaryPanel.propTypes = {
  serviceNowNotificationModel: PropTypes.object,
};

export default PipelineStepServiceNowNotificationSummaryPanel;
