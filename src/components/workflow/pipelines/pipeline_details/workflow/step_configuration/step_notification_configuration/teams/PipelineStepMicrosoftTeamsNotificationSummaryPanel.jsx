import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";

function PipelineStepMicrosoftTeamsNotificationSummaryPanel({ teamsNotificationModel }) {
  if (teamsNotificationModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading Summary"} />);
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <BooleanField dataObject={teamsNotificationModel} fieldName={"enabled"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"event"} dataObject={teamsNotificationModel} />
        </Col>
        <Col lg={6}>
          <TextFieldBase fieldName={"toolId"} dataObject={teamsNotificationModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineStepMicrosoftTeamsNotificationSummaryPanel.propTypes = {
  teamsNotificationModel: PropTypes.object,
};

export default PipelineStepMicrosoftTeamsNotificationSummaryPanel;
