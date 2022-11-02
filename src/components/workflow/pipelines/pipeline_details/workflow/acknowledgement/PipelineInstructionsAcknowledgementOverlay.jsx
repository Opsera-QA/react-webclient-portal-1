import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { faFileCheck } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import {
  userActionsPipelineStepMetadata
} from "components/workflow/plan/step/user_actions/userActionsPipelineStep.metadata";
import PipelineInstructionsField
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AcknowledgePipelineInstructionsButton
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/AcknowledgePipelineInstructionsButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

export default function PipelineInstructionsAcknowledgementOverlay({ pipeline }) {
  const toastContext = useContext(DialogToastContext);
  const approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);
  const toolIdentifier = PipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);
  const configuration = DataParsingHelper.parseNestedObject(approvalStep, "tool.configuration");
  const userActionsStepModel = modelHelpers.parseObjectIntoModel(configuration, userActionsPipelineStepMetadata);
  const [message, setMessage] = useState("");

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase>
        <AcknowledgePipelineInstructionsButton
          pipelineId={pipeline?._id}
          pipelineStepId={approvalStep?._id}
          message={message}
        />
      </ButtonContainerBase>
    );
  };

  if (hasStringValue(toolIdentifier) !== true || toolIdentifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={"Acknowledge Instructions"}
      titleIcon={faFileCheck}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>
        <PipelineInstructionsField
          model={userActionsStepModel}
          fieldName={"pipelineInstructionsId"}
          showInstructions={true}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineInstructionsAcknowledgementOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  pipeline: PropTypes.object
};


