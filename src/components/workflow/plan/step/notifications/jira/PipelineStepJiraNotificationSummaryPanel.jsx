import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function PipelineStepJiraNotificationSummaryPanel({ jiraNotificationModel }) {
  if (jiraNotificationModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={jiraNotificationModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <ToolNameField fieldName={"jiraToolId"} model={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraProject"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraSprint"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraPriority"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraPrimaryAssignee"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <GenericItemField fieldName={"jiraSecondaryAssignees"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraBoard"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraParentTicket"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraOpenStep"} dataObject={jiraNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"jiraClosureStep"} dataObject={jiraNotificationModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStepJiraNotificationSummaryPanel.propTypes = {
  jiraNotificationModel: PropTypes.object,
};

export default PipelineStepJiraNotificationSummaryPanel;
