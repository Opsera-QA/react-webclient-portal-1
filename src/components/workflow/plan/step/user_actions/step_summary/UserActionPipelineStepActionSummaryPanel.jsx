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
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import DateTimeField from "components/common/fields/date/DateTimeField";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import useGetPipelineInstructionsModel from "components/workflow/instructions/hooks/useGetPipelineInstructionsModel";

export default function UserActionPipelineStepActionSummaryPanel(
  {
    pipelineTaskModel,
    setActiveTab,
  }) {
  const acknowledgementData = DataParsingHelper.parseNestedObject(pipelineTaskModel?.getPersistData(), "api_response.threshold.value", {});
  const acknowledgementModel = modelHelpers.parseObjectIntoModel(acknowledgementData, userAcknowledgementMetadata);
  const {
    getNewPipelineInstructionsModel,
  } = useGetPipelineInstructionsModel();
  const pipelineAcknowledgementModel = getNewPipelineInstructionsModel(acknowledgementModel?.getData("api_response.instructions"));

  const getDynamicFields = () => {
    if (acknowledgementModel?.getData("denied") === true) {
      return (
        <>
          <Col xs={6}>
            <BooleanField
              fieldName={"denied"}
              dataObject={acknowledgementModel}
            />
          </Col>
          <Col xs={6}>
            <DateTimeField
              fieldName={"denied_on"}
              dataObject={acknowledgementModel}
            />
          </Col>
        </>
      );
    }

    return (
      <>
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
      </>
    );
  };

  if (pipelineTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase
      pipelineTaskData={pipelineTaskModel}
      messageFieldName={"api_response.message"}
      setActiveTab={setActiveTab}
    >
      <Col xs={6}>
        <SsoUserField
          fieldName={"user"}
          model={acknowledgementModel}
        />
      </Col>
      <Col xs={6}>
        <EmailAddressField
          fieldName={"email"}
          model={acknowledgementModel}
        />
      </Col>
      {getDynamicFields()}
      <Col xs={12}>
        <RichTextField
          fieldName={"instructions"}
          model={pipelineAcknowledgementModel}
        />
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

UserActionPipelineStepActionSummaryPanel.propTypes = {
  pipelineTaskModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};
