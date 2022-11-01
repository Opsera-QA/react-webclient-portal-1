import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import UserNameField from "components/common/fields/user/UserNameField";

export default function UserActionsPipelineStepConfigurationSummaryPanel(
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
        <Col lg={6}>
          <UserNameField
            fieldName={"contact"}
            model={userActionsPipelineStepModel}
          />
        </Col>
        <Col lg={12}>
          <TextFieldBase
            fieldName={"message"}
            dataObject={userActionsPipelineStepModel}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

UserActionsPipelineStepConfigurationSummaryPanel.propTypes = {
  userActionsPipelineStepModel: PropTypes.object,
  pipelineModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};
