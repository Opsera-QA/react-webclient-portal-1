import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import RichTextField from "components/common/fields/rich_text/RichTextField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {
  userAcknowledgementMetadata
} from "components/workflow/plan/step/user_actions/step_summary/UserActionAcknoweledgement.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import DateTimeField from "components/common/fields/date/DateTimeField";

export default function UserActionPipelineStepActionSummaryPanel(
  {
    pipelineTaskModel,
  }) {
  const acknowledgementData = DataParsingHelper.parseNestedObject("api_response.threshold.value", {});
  const acknowledgementModel = modelHelpers.parseObjectIntoModel(acknowledgementData, userAcknowledgementMetadata);

  if (pipelineTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={pipelineTaskModel}>
      <Col xs={6}>
        <TextFieldBase
          fieldName={"user"}
          dataObject={acknowledgementModel}
        />
      </Col>
      <Col xs={6}>
        <EmailAddressField
          fieldName={"email"}
          model={acknowledgementModel}
        />
      </Col>
      <Col xs={6}>
        <BooleanField
          fieldName={"approved"}
          dataObject={acknowledgementModel}
        />
      </Col>
      <Col xs={6}>
        <DateTimeField
          fieldName={"approved_on"}
          dataObject={acknowledgementModel}
        />
      </Col>
      <Col xs={12}>
        <RichTextField
          fieldName={"api_response.instructions"}
          model={pipelineTaskModel}
        />
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

UserActionPipelineStepActionSummaryPanel.propTypes = {
  pipelineTaskModel: PropTypes.object,
};
