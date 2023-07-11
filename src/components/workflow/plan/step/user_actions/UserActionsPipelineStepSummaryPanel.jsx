import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer
from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import UserNameField from "components/common/fields/user/UserNameField";
import PipelineInstructionsField
from "components/common/list_of_values_input/workflow/instructions/PipelineInstructionsField";
import MessageField from "components/common/fields/text/message/MessageField";

export default function UserActionsPipelineStepSummaryPanel(
  {
    userActionsPipelineStepModel,
    pipelineModel,
    setActiveTab,
  }) {

  if (userActionsPipelineStepModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineModel}>
      <Row>
        <Col xs={12}>
          <UserNameField
            fieldName={"contact"}
            model={userActionsPipelineStepModel}
          />
        </Col>
        <Col xs={12}>
          <MessageField
            fieldName={"message"}
            model={userActionsPipelineStepModel}
          />
        </Col>
        <Col xs={12}>
          <PipelineInstructionsField
            fieldName={"pipelineInstructionsId"}
            model={userActionsPipelineStepModel}
            showInstructions={true}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

UserActionsPipelineStepSummaryPanel.propTypes = {
  userActionsPipelineStepModel: PropTypes.object,
  pipelineModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};
